from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from catalog.models import *
from catalog.serializers import *
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.permissions import AllowAny

class CategoryListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Категории не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SortedBooksView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        ordering = self.request.query_params.get('ordering')
        if ordering == 'price':
            queryset = queryset.order_by('price')
        elif ordering == '-price':
            queryset = queryset.order_by('-price')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Книги не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = BookInCart.objects.all()
    serializer_class = CartSerializer

    def create(self, request, *args, **kwargs):
        book_id = request.data.get('book')
        client_user_id = request.data.get('client')

        # Проверка существования книги
        if not Book.objects.filter(id=book_id).exists():
            return Response(
                {"message": "Книга не найдена"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Проверка существования клиента (через user_id)
        if not Client.objects.filter(user_id=client_user_id).exists():
            return Response(
                {"message": "Клиент не найден"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)


class BookListView(ListAPIView):
    permission_classes = [AllowAny]
    def get(self, request):
        books = Book.objects.prefetch_related('authors').all()
        serializer = BookSerializer(books, many=True, context=self.get_serializer_context())
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        return {'request': self.request}


class BookSearchView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        query = request.query_params.get('q', '')

        if not query:
            return Response({"error": "Поисковый запрос не указан"}, status=status.HTTP_400_BAD_REQUEST)

        books = Book.objects.filter(
            Q(title__icontains=query) |
            Q(authorsofbook__author__author_last_name__icontains=query) |
            Q(authorsofbook__author__author_first_name__icontains=query) |
            Q(category__category_name__icontains=query)
        ).distinct()

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)