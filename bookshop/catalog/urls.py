from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .handlers.catalog_page import *
from .handlers.authorization import *
from .handlers.book_detail import *
from .handlers.notifications import *

urlpatterns = ([
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
])
