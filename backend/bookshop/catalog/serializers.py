from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from django.utils import timezone
from rest_framework.reverse import reverse
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['author_last_name', 'author_first_name', 'author_patronymic']

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'price', 'discounted_price', 'authors', 'cover_image', 'number_of_copies']

    def get_cover_image(self, obj):
        request = self.context.get('request')
        if obj.cover_image:
            return request.build_absolute_uri(obj.cover_image.url)
        elif obj.cover_image:
            return obj.cover_image.url
        return None

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'discount_name', 'discount_percentage']

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ['id', 'name_status']

class DetailBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    cover_image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.category_name', read_only=True)
    discount = DiscountSerializer(read_only=True)
    class Meta:
        model = Book
        fields = ['id', 'title', 'category_name', 'price', 'discount', 'discounted_price', 'authors', 'cover_image', 'ISBN', 'description', 'publishing', 'publishing_year', 'number_of_copies']

    def get_cover_image(self, obj):
        request = self.context.get('request')
        if obj.cover_image:
            return request.build_absolute_uri(obj.cover_image.url)
        elif obj.cover_image:
            return obj.cover_image.url
        return None

class ShortBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'authors', 'price', 'cover_image']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInCart
        fields = ['id', 'book', 'book_id', 'count_of_book']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.SlugRelatedField(
        queryset=Role.objects.all(),
        slug_field='role_name',
        required=False
    )

    class Meta:
        model = User
        fields = ("email", "username", "phone_number", "password", "password2", "role")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    User = get_user_model()
    username_field = 'email'  # Указываем, что используем email

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }
        user = User.objects.filter(email=credentials['email']).first()

        if user and user.check_password(credentials['password']):

            # Создаём refresh-токен (он автоматически регистрируется в OutstandingToken)
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            # Проверяем, нет ли дубликата access-токена, и добавляем его
            if not OutstandingToken.objects.filter(jti=access['jti']).exists():
                OutstandingToken.objects.create(
                    user=user,
                    token=str(access),
                    jti=access['jti'],
                    expires_at=timezone.make_aware(timezone.datetime.fromtimestamp(access['exp'])),
                    created_at=timezone.now()
                )

            # Формируем ответ
            data = {
                'refresh': str(refresh),
                'access': str(access),
                'email': user.email,
                'role' : user.role.role_name
            }
            return data
        else:
            raise serializers.ValidationError('Неверный email или пароль')

class HistoryOfNotesSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    class Meta:
        model = HistoryOfNotes
        fields = ['id', 'text_note', 'date_note', 'order_id']

class CartBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = BookInCart
        fields = ['book', 'count_of_book', 'total_price']

    def get_total_price(self, obj):
        price = obj.book.discounted_price or obj.book.price
        return round(obj.count_of_book * price, 2)

class UpdateCartItemSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
    count_of_book = serializers.IntegerField(min_value=1)

class RemoveCartItemSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()

class BookInOrderSerializer(serializers.ModelSerializer):
    book_id = serializers.IntegerField(source='book.id', read_only=True)
    cover_image = serializers.SerializerMethodField()
    title = serializers.CharField(source='book.title', read_only=True)
    class Meta:
        model = BookInOrder
        fields = ['book_id', 'title', 'count_of_book', 'cover_image']

    def get_cover_image(self, obj):
        request = self.context.get('request')
        if obj.book.cover_image:
            if request:
                return request.build_absolute_uri(obj.book.cover_image.url)
            return obj.book.cover_image.url
        return None

class OrderHistorySerializer(serializers.ModelSerializer):
    books = BookInOrderSerializer(many=True, read_only=True, source='bookinorder_set', context={'request': None})
    status_name = serializers.CharField(source='status.name_status', read_only=True)

    class Meta:
        model = OrderHistory
        fields = ['id', 'sale_date', 'sale_price', 'status_name', 'books']

import json

class BookCreateUpdateSerializer(serializers.ModelSerializer):
    authors_data_json = serializers.CharField(write_only=True, required=False, allow_blank=True)
    discount = serializers.CharField(allow_null=True, required=False)

    def validate_price(self, value):
        if value is not None:
            return round(float(value), 2)
        return value
    def validate_discount(self, value):
        if value == "null" or value is None:
            return None
        try:
            return Discount.objects.get(pk=value)
        except Discount.DoesNotExist:
            raise serializers.ValidationError("Скидка не существует")
        
    def validate_cover_image(self, value):
        if value in (None, "", "null", 'null'): 
            return None 
        return value
    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        authors_json_str = validated_data.pop('authors_data_json', '[]')
        authors_data = []

        if authors_json_str:
            try:
                authors_data = json.loads(authors_json_str)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"authors_data_json": "Некорректный формат JSON для авторов."})

        book = Book.objects.create(**validated_data)

        if authors_data:
            if not isinstance(authors_data, list):
                 raise serializers.ValidationError({"authors_data_json": "Авторы должны быть списком объектов."})

            for author_data in authors_data:
                if not isinstance(author_data, dict):
                    raise serializers.ValidationError({"authors_data_json": "Каждый автор должен быть объектом."})
                if 'author_last_name' not in author_data or 'author_first_name' not in author_data:
                    raise serializers.ValidationError({"authors_data_json": "Для каждого автора необходимы 'author_last_name' и 'author_first_name'."})

                author, created = Author.objects.get_or_create(
                    author_last_name=author_data['author_last_name'],
                    author_first_name=author_data['author_first_name'],
                    author_patronymic=author_data['author_patronymic'])
                AuthorsOfBook.objects.create(book=book, author=author)
        return book

    def update(self, instance, validated_data):
        authors_json_str = validated_data.pop('authors_data_json', None)
        authors_data = []

        if authors_json_str is not None:
            try:
                authors_data = json.loads(authors_json_str)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"authors_data_json": "Некорректный формат JSON для авторов."})

            AuthorsOfBook.objects.filter(book=instance).delete()
            if authors_data:
                if not isinstance(authors_data, list):
                     raise serializers.ValidationError({"authors_data_json": "Авторы должны быть списком объектов."})

                for author_data in authors_data:
                    if not isinstance(author_data, dict):
                        raise serializers.ValidationError({"authors_data_json": "Каждый автор должен быть объектом."})
                    if 'author_last_name' not in author_data or 'author_first_name' not in author_data:
                        raise serializers.ValidationError({"authors_data_json": "Для каждого автора необходимы 'author_last_name' и 'author_first_name'."})

                    author, created = Author.objects.get_or_create(
                        author_last_name=author_data['author_last_name'],
                        author_first_name=author_data['author_first_name'],
                        author_patronymic=author_data['author_patronymic'],
                        )
                    AuthorsOfBook.objects.create(book=instance, author=author)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
class AuthorSerializerForList(serializers.ModelSerializer):
    last_name = serializers.CharField(source='author_last_name', read_only=True)
    first_name = serializers.CharField(source='author_first_name', read_only=True)
    patronymic = serializers.CharField(source='author_patronymic', read_only=True)

    class Meta:
        model = Author
        fields = ['last_name', 'first_name', 'patronymic']

class OrderHistoryAdminSerializer(serializers.ModelSerializer):
    books = BookInOrderSerializer(many=True, read_only=True, source='bookinorder_set')
    status = serializers.PrimaryKeyRelatedField(queryset=OrderStatus.objects.all())
    client_name = serializers.CharField(source='client.user.username', read_only=True)
    client_phone = serializers.CharField(source='client.user.phone_number', read_only=True)

    class Meta:
        model = OrderHistory
        fields = ['id', 'client_name', 'client_phone', 'sale_date', 'sale_price', 'status', 'books']

