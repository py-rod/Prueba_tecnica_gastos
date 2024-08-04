from django.shortcuts import render
from django.contrib.auth import get_user_model
from .serializer import CreateExpensesSerializer, UpgradeExpensesSerializer, GetExpenseSerializer
from .models import Expenses

# RESTFRAMEWORK
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_expenses(request):
    expenses = request.data
    expenses['user'] = request.user.id
    serializer = CreateExpensesSerializer(data=expenses)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_expenses_by_user(request):
    expense = Expenses.objects.filter(user=request.user).all()
    serializer = GetExpenseSerializer(expense, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_expenses_by_admin(request):
    expenses = Expenses.objects.all()
    serializer = GetExpenseSerializer(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upgrade_expenses(request, id_expense):

    try:
        expense = Expenses.objects.get(user=request.user, id=id_expense)
    except Expenses.DoesNotExist:
        return Response({'message': 'Expense not found or not authorized to update'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UpgradeExpensesSerializer(
        expense, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_expense_by_user(request, id_expense):
    try:
        expense = Expenses.objects.get(user=request.user, id=id_expense)
    except Expenses.DoesNotExist:
        return Response({'message': 'The expense not found'})
    else:
        expense.delete()
        return Response({'message': 'The expense has been delete'}, status=status.HTTP_200_OK)
