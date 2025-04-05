from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username)  # Ищем по email
        except UserModel.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None


class CustomJWTAuthentication(JWTAuthentication):
    def get_validated_token(self, raw_token):
        # Получаем токен стандартным способом
        validated_token = super().get_validated_token(raw_token)

        # Проверяем, есть ли токен в чёрном списке
        if BlacklistedToken.objects.filter(token__jti=validated_token['jti']).exists():
            raise InvalidToken("Token is blacklisted")

        return validated_token