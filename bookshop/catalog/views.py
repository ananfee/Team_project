from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse('index')

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category
from .serializers import CategorySerializer

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.generics import ListAPIView
from .models import Book
from .serializers import BookSerializer

class SortedBooksView(ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        order = self.request.query_params.get('order', 'asc')
        if order == 'desc':
            return Book.objects.order_by('-price')
        return Book.objects.order_by('price')


from rest_framework.views import APIView
from .models import Cart, Book, User
from .serializers import CartSerializer
from django.shortcuts import get_object_or_404

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

