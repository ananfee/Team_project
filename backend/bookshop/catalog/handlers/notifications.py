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
            notifications = HistoryOfNotes.objects.filter(client=client)
            # Проверка на отсутствие уведомлений
            if not notifications.exists():
                return Response({"message": "У вас нет уведомлений."}, status=status.HTTP_204_NO_CONTENT)
            serializer = HistoryOfNotesSerializer(notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Client.DoesNotExist:
            return Response({"error": "Клиент не найден"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "Произошла ошибка при обработке запроса."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
