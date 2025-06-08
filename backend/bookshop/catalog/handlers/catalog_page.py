from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
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

class AddToCartView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = BookInCart.objects.all()
    serializer_class = CartSerializer

    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            try:
                client = Client.objects.get(user=user)
            except Client.DoesNotExist:
                return Response(
                    {"message": "Клиент не найден"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            book_id = serializer.validated_data['book'].id
            count_of_book = serializer.validated_data.get('count_of_book', 1)

            try:
                book = Book.objects.get(id=book_id)
            except Book.DoesNotExist:
                return Response(
                    {"message": "Книга не найдена"},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                cart_item, created = BookInCart.objects.get_or_create(
                    client=client,
                    book=book,
                    defaults={'count_of_book': count_of_book}
                )
                if not created:
                    cart_item.count_of_book += count_of_book
                    if hasattr(book, 'number_of_copies') and book.number_of_copies < cart_item.count_of_book:
                        return Response(
                            {"message": f"Недостаточно книг в наличии: доступно {book.number_of_copies}"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    cart_item.save()
            except DatabaseError as e:
                return Response(
                    {"message": "Ошибка при добавлении книги в корзину"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            try:
                updated_cart = BookInCart.objects.filter(client=client)
                output_serializer = CartSerializer(updated_cart, many=True, context={'request': request})
            except DatabaseError as e:
                return Response(
                    {"message": "Ошибка при получении корзины"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except ValidationError as e:
                return Response(
                    {"message": "Ошибка сериализации данных корзины"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(output_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"message": "Произошла непредвиденная ошибка"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class BookListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.prefetch_related('authors').all()
    serializer_class = BookSerializer

    def get(self, request, *args, **kwargs):
        if not self.queryset.exists():
            return Response(
                {"message": "Книги не найдены"},
                status=status.HTTP_200_OK
            )
        return super().get(request, *args, **kwargs)

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
        if not books.exists():
            return Response(
                {"message": "Книги не найдены"},
                status=status.HTTP_200_OK
            )
        serializer = BookSerializer(books, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)