from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from catalog.models import *
from catalog.serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny

class BookDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = DetailBookSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        book = self.get_object()
        serializer = self.get_serializer(book)

        # Получаем авторов текущей книги
        authors = book.authors.all()

        # ID всех книг, чтобы исключать повторы
        already_seen_ids = set([book.id])

        # 1. Книги с такой же категорией и хотя бы одним тем же автором
        both_qs = Book.objects.filter(
            category=book.category,
            authors__in=authors
        ).exclude(id=book.id).distinct()
        both_books = list(both_qs[:5])
        already_seen_ids.update(b.id for b in both_books)

        # 2. Книги с такой же категорией
        category_qs = Book.objects.filter(
            category=book.category
        ).exclude(id__in=already_seen_ids).distinct()
        category_books = list(category_qs[:5])
        already_seen_ids.update(b.id for b in category_books)

        # 3. Книги с теми же авторами
        author_qs = Book.objects.filter(
            authors__in=authors
        ).exclude(id__in=already_seen_ids).distinct()
        author_books = list(author_qs[:5])

        # Объединяем всё в один список
        similar_books = both_books + category_books + author_books
        similar_serializer = ShortBookSerializer(similar_books, many=True)

        return Response({
            'book': serializer.data,
            'similar_books': similar_serializer.data
        }, status=status.HTTP_200_OK)