from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .handlers.catalog_page import *
from .handlers.authorization import *
from .handlers.book_detail import *
from .handlers.notifications import *
from .handlers.cart import *
from .handlers.order_history import *
from .handlers.сatalog_management import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def hello(request):

    permission_classes = [permissions.AllowAny]
    return Response({"Hello": "World"})


urlpatterns = ([
    path('hello/', hello),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('books/sorted/', SortedBooksView.as_view(), name='sorted-books'),
    path('cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/search/', BookSearchView.as_view(), name='book-search'),
    path('books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('notifications/', NotificationsView.as_view(), name='notifications'),
    path('get_cart/', CartView.as_view(), name='cart'),
    path('cart/update/', UpdateCartItemView.as_view(), name='update-cart-item'),
    path('cart/remove/', RemoveCartItemView.as_view(), name='remove-cart-item'),
    path('cart/clear/', ClearCartView.as_view(), name='clear-cart'),
    path('cart/checkout/', CheckoutView.as_view(), name='checkout'),
    path('order-history/', OrderHistoryView.as_view(), name='order-history'),
    path('books/create/', BooksView.as_view(), name='book-create'),
    path('books/update/<int:book_id>/', BooksView.as_view(), name='book-update'),
    path('books/delete/<int:book_id>/', BooksView.as_view(), name='book-delete'),
    path('discounts/', DiscountListView.as_view(), name='discount-list'),
    path('authors/', AuthorListView.as_view(), name='author-list'),
])
