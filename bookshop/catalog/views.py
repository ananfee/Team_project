from django_filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView
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

<<<<<<< HEAD
class AddToCartView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        book_id = request.data.get('book_id')
        quantity = request.data.get('quantity', 1)

        user = get_object_or_404(User, id=user_id)
        book = get_object_or_404(Book, id=book_id)

        cart_item, created = Cart.objects.get_or_create(user=user, book=book)
        cart_item.quantity += quantity
        cart_item.save()

        return Response(CartSerializer(cart_item).data, status=status.HTTP_201_CREATED)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer
from django.shortcuts import get_object_or_404

class BookListView(ListAPIView):
    queryset = Book.objects.all()
    serializer = BookSerializer(books, many=True)

class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'

=======
>>>>>>> 1751356a1050994178d98909a2ff5d4fc4aee95a
