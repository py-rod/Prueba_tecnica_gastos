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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_income_by_user(request):
    incomes = Income.objects.filter(user=request.user).all()
    serializer = GetAllIncomeSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes(permission_classes=[IsAdminUser])
def get_all_income_by_admin(request):
    incomes = Income.objects.all()
    serializer = GetAllIncomeSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upgrade_income(request, id_income):
    try:
        saving = Income.objects.get(user=request.user, id=id_income)
    except Income.DoesNotExist:
        return Response({'message': 'The income is not found'})

    serializer = UpgradeIncomeSerializer(
        saving, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_income(request, id_income):
    try:
        saving = Income.objects.get(user=request.user, id=id_income)
    except Income.DoesNotExist:
        return Response({'message': 'The income is not found '})
    else:
        saving.delete()
        return Response({'message': 'The income has been delete'})
