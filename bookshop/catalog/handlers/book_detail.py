from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from catalog.models import *
from catalog.serializers import *
from django.shortcuts import get_object_or_404

class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'