from django.shortcuts import render
from .models import TypeOfExpense
from django.contrib.auth import get_user_model
from .serializer import CreateTypeOfExpense, GetAllTypeOfExpense, UpgradeTypeOfExpense

# RESTFRAMEWORK
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_type_of_expense(request):
    data = request.data
    data['user'] = request.user.id
    serializer = CreateTypeOfExpense(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_type_of_expenses_by_user(request):
    expenses = TypeOfExpense.objects.filter(user=request.user).all()
    serializer = GetAllTypeOfExpense(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_type_of_expenses_by_admin(request):
    savings = TypeOfExpense.objects.all()
    serializer = GetAllTypeOfExpense(savings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upgrade_type_expense(request, id_expense):
    try:
        saving = TypeOfExpense.objects.get(user=request.user, id=id_expense)
    except TypeOfExpense.DoesNotExist:
        return Response({'message': 'The type of expense is not found'})

    serializer = UpgradeTypeOfExpense(saving, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_type_expense(request, id_expense):
    try:
        saving = TypeOfExpense.objects.get(user=request.user, id=id_expense)
    except TypeOfExpense.DoesNotExist:
        return Response({'message': 'The type of expense is not found '})
    else:
        saving.delete()
        return Response({'message': 'The type of expense has been delete'})
