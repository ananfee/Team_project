from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.db import transaction
from catalog.models import *
from catalog.serializers import *

class DiscountListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Скидки не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AuthorListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializerForList

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Авторы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(queryset, many=True)

        last_names = sorted({author.get('last_name') for author in serializer.data if author.get('last_name')})
        first_names = sorted({author.get('first_name') for author in serializer.data if author.get('first_name')})
        patronymics = sorted({author.get('patronymic') for author in serializer.data if author.get('patronymic')})

        return Response({
            "last_names": last_names,
            "first_names": first_names,
            "patronymics": patronymics
        }, status=status.HTTP_200_OK)
    

class BooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @transaction.atomic
    def post(self, request):
        try:
            serializer = BookCreateUpdateSerializer(data=request.data)
            if serializer.is_valid():
                discount_id = request.data.get('discount')
                if discount_id == "null":
                    discount_id = None
                if discount_id:
                    try:
                        discount = Discount.objects.get(pk=discount_id)
                        serializer.validated_data['discounted_price'] = round(serializer.validated_data.get('price') * (1 - discount.discount_percentage / 100), 2)
                    except Discount.DoesNotExist:
                        return Response({"error": "Скидка не существует"}, status=status.HTTP_400_BAD_REQUEST)
                    except KeyError:
                        return Response({"error": "Цена не указана"}, status=status.HTTP_400_BAD_REQUEST)

                book = serializer.save()
                return Response("Книга успешно добавлена", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Произошла ошибка при добавлении книги"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def put(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            serializer = BookCreateUpdateSerializer(instance=book, data=request.data, partial=True)
            if serializer.is_valid():
                discount_id = request.data.get('discount')
                if discount_id == "null":
                    discount_id = None
                if discount_id:
                    try:
                        discount = Discount.objects.get(pk=discount_id)
                        serializer.validated_data['discounted_price'] = round(serializer.validated_data.get('price',
                                                                                                      book.price) * (
                                                                                1 - discount.discount_percentage / 100), 2)
                    except Discount.DoesNotExist:
                        return Response({"error": "Скидка не существует"}, status=status.HTTP_400_BAD_REQUEST)
                elif discount_id is None:
                    serializer.validated_data['discounted_price'] = None

                serializer.save()
                return Response("Изменения сохранены", status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "Произошла ошибка при обновлении книги"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            if book.number_of_copies > 0:
                 return Response({"error": "Нельзя удалить книгу, так как у нее есть экземпляры в наличии"}, status=status.HTTP_400_BAD_REQUEST)
            book.delete()
            return Response("Книга успешно удалена", status=status.HTTP_204_NO_CONTENT)
        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "Произошла ошибка при удалении книги"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            serializer = DetailBookSerializer(book)

            # Получаем авторов текущей книги
            authors = book.authors.all()
            already_seen_ids = {book.id}

            # 1. Книги с такой же категорией и хотя бы одним тем же автором
            both_books = Book.objects.filter(
                category=book.category,
                authors__in=authors
            ).exclude(id=book.id).distinct()[:5]

            already_seen_ids.update(b.id for b in both_books)

            # 2. Книги с такой же категорией
            category_books = Book.objects.filter(
                category=book.category
            ).exclude(id__in=already_seen_ids).distinct()[:5]

            already_seen_ids.update(b.id for b in category_books)

            # 3. Книги с теми же авторами
            author_books = Book.objects.filter(
                authors__in=authors
            ).exclude(id__in=already_seen_ids).distinct()[:5]

            # Объединяем всё в один список
            similar_books = list(both_books) + list(category_books) + list(author_books)
            similar_serializer = BookSerializer(similar_books, many=True)

            return Response({
                'book': serializer.data,
                'similar_books': similar_serializer.data
            }, status=status.HTTP_200_OK)

        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

