from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import SavingsTargets
from .serializer import CreateSavingsTargetsSerializer, GetAllSavingsTargetsSerializer, UpgradeSavingsTargetsSerializer

# RESTFRAMEWORK
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_savings_targets(request):
    data = request.data
    data['user'] = request.user.id
    serializer = CreateSavingsTargetsSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_savings_targets_by_user(request):
    incomes = SavingsTargets.objects.filter(user=request.user).all()
    serializer = GetAllSavingsTargetsSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes(permission_classes=[IsAdminUser])
def get_all_savings_targets_by_admin(request):
    incomes = SavingsTargets.objects.all()
    serializer = GetAllSavingsTargetsSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upgrade_saving_target(request, id_saving_target):
    try:
        saving = SavingsTargets.objects.get(
            user=request.user, id=id_saving_target)
    except SavingsTargets.DoesNotExist:
        return Response({'message': 'The saving target is not found'})

    serializer = UpgradeSavingsTargetsSerializer(
        saving, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_saving_target(request, id_saving_target):
    try:
        saving = SavingsTargets.objects.get(
            user=request.user, id=id_saving_target)
    except SavingsTargets.DoesNotExist:
        return Response({'message': 'The saving target is not found '})
    else:
        saving.delete()
        return Response({'message': 'The saving target has been delete'})
