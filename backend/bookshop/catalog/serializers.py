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
        fields = ['id', 'title', 'price', 'discounted_price', 'authors', 'cover_image']

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
    cover_image = serializers.ImageField(source='book.cover_image', read_only=True)
    title = serializers.CharField(source='book.title', read_only=True)
    class Meta:
        model = BookInOrder
        fields = ['book_id', 'title', 'count_of_book', 'cover_image']

    def get_cover_image(self, obj):
        if obj.book.cover_image:
            return obj.book.cover_image.url
        return None

class OrderHistorySerializer(serializers.ModelSerializer):
    books = BookInOrderSerializer(many=True, read_only=True, source='bookinorder_set', context={'request': None})
    status_name = serializers.CharField(source='status.name_status', read_only=True)

    class Meta:
        model = OrderHistory
        fields = ['id', 'sale_date', 'sale_price', 'status_name', 'books']

class BookCreateUpdateSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=Author.objects.all(), required=False)
    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        author_ids = self.initial_data.get('author', [])
        authors = Author.objects.filter(pk__in=author_ids)
        book = super().create(validated_data)
        book.authors.set(authors)
        return book
    def update(self, instance, validated_data):
        author_ids = self.initial_data.get('author', [])
        authors = Author.objects.filter(pk__in=author_ids)
        book = super().update(instance, validated_data)
        book.authors.set(authors)
        return book

class AuthorSerializerForList(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'author_last_name', 'author_first_name', 'author_patronymic']

class OrderHistoryAdminSerializer(serializers.ModelSerializer):
    books = BookInOrderSerializer(many=True, read_only=True, source='bookinorder_set')
    status = serializers.PrimaryKeyRelatedField(queryset=OrderStatus.objects.all())
    client_name = serializers.CharField(source='client.user.username', read_only=True)
    client_phone = serializers.CharField(source='client.user.phone_number', read_only=True)

    class Meta:
        model = OrderHistory
        fields = ['id', 'client_name', 'client_phone', 'sale_date', 'sale_price', 'status', 'books']

