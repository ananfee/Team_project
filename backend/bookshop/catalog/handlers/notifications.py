from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from catalog.models import HistoryOfNotes, Client
from catalog.serializers import HistoryOfNotesSerializer

class NotificationsView(APIView):
    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            client = Client.objects.get(user=request.user)
        except Client.DoesNotExist:
            return Response({"error": "Клиент не найден"}, status=status.HTTP_404_NOT_FOUND)

        notifications = HistoryOfNotes.objects.filter(client=client)
        serializer = HistoryOfNotesSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

