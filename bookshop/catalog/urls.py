from django.urls import path
from .views import *

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('books/', SortedBooksView.as_view(), name='sorted-books'),
    path('cart/', AddToCartView.as_view(), name='add-to-cart'),
]