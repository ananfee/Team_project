from django_filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SortedBooksView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category_id']
    ordering_fields = ['price']


class AddToCartView(CreateAPIView):
    queryset = Book_in_cart.objects.all()
    serializer_class = CartSerializer


class BookListView(ListAPIView):
    queryset = Book.objects.all()
    serializer = BookSerializer

class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'

