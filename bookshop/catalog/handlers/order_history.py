from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from catalog.models import OrderHistory, BookInOrder, Client
from catalog.serializers import OrderHistorySerializer


class OrderHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            client = Client.objects.get(user=request.user)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

        orders = OrderHistory.objects.filter(client=client)
        serializer = OrderHistorySerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)