from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from catalog.models import *
from catalog.serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.utils import timezone

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({"message": f"Привет, {request.user.email}! Это защищённый эндпоинт."})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Аннулируем refresh-токен
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            print(f"Blacklisting refresh token with JTI: {token['jti']}")
            token.blacklist()

            # Аннулируем access-токен вручную
            access_token = request.auth
            if access_token:
                access = AccessToken(str(access_token))
                print(f"Blacklisting access token with JTI: {access['jti']}")
                # Добавляем access-токен в чёрный список
                outstanding_token = OutstandingToken.objects.filter(jti=access['jti']).first()
                if outstanding_token:
                    BlacklistedToken.objects.get_or_create(token=outstanding_token)
                else:
                    return Response({"error": "Access token not found in outstanding tokens"},
                                    status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Успешный выход"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)