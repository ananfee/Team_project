from django.urls import path
from .handlers.catalog_page import *
from .handlers.authorization import *

urlpatterns = ([
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('books/sorted/', SortedBooksView.as_view(), name='sorted-books'),
    path('cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
])
#+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))