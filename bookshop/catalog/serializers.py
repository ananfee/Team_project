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
