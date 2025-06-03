from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from django.utils import timezone
from catalog.models import *
from catalog.serializers import *
from rest_framework.exceptions import NotFound


class CartView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartBookSerializer

    def get_queryset(self):
        try:
            client = Client.objects.get(user=self.request.user)
        except Client.DoesNotExist:
            raise NotFound("Клиент не найден.")

        return BookInCart.objects.filter(client=client).select_related('book')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Корзина пуста"},
                status=status.HTTP_200_OK
            )
        return super().list(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}


class UpdateCartItemView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateCartItemSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = Client.objects.get(user=request.user)
        book_id = serializer.validated_data['book_id']
        count = serializer.validated_data['count_of_book']

        try:
            cart_item = BookInCart.objects.get(client=client, book_id=book_id)
            cart_item.count_of_book = count
            cart_item.save()
        except BookInCart.DoesNotExist:
            return Response({"error": "Книга не найдена в корзине"}, status=status.HTTP_404_NOT_FOUND)

        updated_items = BookInCart.objects.filter(client=client)
        output_serializer = CartBookSerializer(updated_items, many=True, context={'request': request})
        return Response(output_serializer.data)


class RemoveCartItemView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RemoveCartItemSerializer

    def delete(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = Client.objects.get(user=request.user)
        book_id = serializer.validated_data['book_id']

        cart_item = BookInCart.objects.filter(client=client, book_id=book_id).first()
        if not cart_item:
            return Response(
                {"message": "Книга не найдена в корзине."},
                status=status.HTTP_404_NOT_FOUND
            )

        cart_item.delete()

        updated_items = BookInCart.objects.filter(client=client)
        output_serializer = CartBookSerializer(updated_items, many=True, context={'request': request})
        return Response(output_serializer.data)


class ClearCartView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        client = Client.objects.get(user=request.user)
        BookInCart.objects.filter(client=client).delete()
        return Response({"message": "Корзина очищена"}, status=status.HTTP_204_NO_CONTENT)


class CheckoutView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        client = Client.objects.get(user=request.user)
        items = BookInCart.objects.filter(client=client).select_related('book')

        if not items.exists():
            return Response({"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST)

        insufficient_books = []
        for item in items:
            if item.book.number_of_copies < item.count_of_book:
                insufficient_books.append({
                    "book_id": item.book.id,
                    "title": item.book.title,
                    "available": item.book.number_of_copies,
                    "requested": item.count_of_book
                })

        if insufficient_books:
            return Response({
                "error": "Некоторые книги отсутствуют в нужном количестве",
                "details": insufficient_books
            }, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            total_price = sum(
                item.count_of_book * (item.book.discounted_price or item.book.price)
                for item in items
            )
            status_pending, _ = OrderStatus.objects.get_or_create(name_status="Обрабатывается")

            order = OrderHistory.objects.create(
                client=client,
                sale_date=timezone.now().date(),
                sale_price=total_price,
                status=status_pending
            )

            for item in items:
                BookInOrder.objects.create(
                    order=order,
                    book=item.book,
                    count_of_book=item.count_of_book
                )
            items.delete()

        return Response({"message": "Заказ успешно оформлен", "order_id": order.id}, status=status.HTTP_201_CREATED)