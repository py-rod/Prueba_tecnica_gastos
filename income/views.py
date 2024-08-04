from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import Income
from .serializer import CreateIncomeSerializer, GetAllIncomeSerializer, UpgradeIncomeSerializer

# RESTFRAMEWORK
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_income(request):
    data = request.data
    data['user'] = request.user.id
    serializer = CreateIncomeSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
