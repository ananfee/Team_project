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

class DetailBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'price', 'discounted_price', 'authors', 'cover_image', 'ISBN', 'description', 'publishing', 'publishing_year', 'number_of_copies']

class ShortBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'authors', 'price', 'cover_image']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInCart
        fields = '__all__'


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), required=False)

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
                'email': user.email
            }
            return data
        else:
            raise serializers.ValidationError('Неверный email или пароль')

class HistoryOfNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryOfNotes
        fields = ['id', 'text_note']