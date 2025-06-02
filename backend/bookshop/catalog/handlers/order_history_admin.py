from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from catalog.models import *
from catalog.serializers import OrderHistoryAdminSerializer, OrderStatusSerializer

class StatusListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Статусы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrderHistoryAdminView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        orders = OrderHistory.objects.all()
        serializer = OrderHistoryAdminSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderStatusUpdateView(APIView):
    def patch(self, request, order_id):
        try:
            order = OrderHistory.objects.get(pk=order_id)
        except OrderHistory.DoesNotExist:
            return Response({"error": "Заказ не найден"}, status=status.HTTP_404_NOT_FOUND)

        new_status_id = request.data.get('status')

        # Проверка на пустой статус
        if new_status_id is None:
            return Response({"error": "Статус не может быть пустым"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_status = OrderStatus.objects.get(pk=new_status_id)
        except OrderStatus.DoesNotExist:
            return Response({"error": "Статус не найден"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderHistoryAdminSerializer(order, data={"status": new_status_id}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Статус заказа изменен', 'order': serializer.data},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
