from rest_framework import serializers
from .models import *
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id_author', 'author_last_name', 'author_first_name', 'author_patronymic']

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'price', 'discounted_price', 'authors', 'cover_image']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInCart
        fields = '__all__'

from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'user_last_name', 'user_first_name', 'user_patronymic', 'email', 'phone_number', 'role', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password
        user = User.objects.create(**validated_data)

        if user.role.role_name == 'Client':
            Client.objects.create(user=user)
        elif user.role.role_name == 'Employee':
            Employee.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким email не найден")

        if not check_password(data['password'], user.password):
            raise serializers.ValidationError("Неверный пароль")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'email': user.email,
            'role': user.role.name
        }