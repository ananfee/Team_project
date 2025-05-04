from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from catalog.models import *
from catalog.serializers import *

class DiscountListView(ListAPIView):
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
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Авторы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BooksView(APIView):
    @transaction.atomic
    def post(self, request):
        try:
            serializer = BookCreateUpdateSerializer(data=request.data)
            if serializer.is_valid():
                discount_id = request.data.get('discount')
                if discount_id:
                    try:
                        discount = Discount.objects.get(pk=discount_id)
                        serializer.validated_data['discounted_price'] = serializer.validated_data.get('price') * (1 - discount.discount_percentage / 100)
                    except Discount.DoesNotExist:
                        return Response({"error": "Скидка не существует"}, status=status.HTTP_400_BAD_REQUEST)
                    except KeyError:
                        return Response({"error": "Цена не указана"}, status=status.HTTP_400_BAD_REQUEST)

                book = serializer.save()
                return Response("Книга успешно добавлена", status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def put(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            serializer = BookCreateUpdateSerializer(book, data=request.data, partial=True)

            if serializer.is_valid():
                discount_id = request.data.get('discount')
                if discount_id:
                    try:
                        discount = Discount.objects.get(pk=discount_id)
                        serializer.validated_data['discounted_price'] = serializer.validated_data.get('price', book.price) * (
                                                                                    1 - discount.discount_percentage / 100)
                    except Discount.DoesNotExist:
                        return Response({"error": "Скидка не существует"}, status=status.HTTP_400_BAD_REQUEST)
                elif discount_id is None:
                    serializer.validated_data['discounted_price'] = None

                book = serializer.save()
                return Response("Изменения сохранены")

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
