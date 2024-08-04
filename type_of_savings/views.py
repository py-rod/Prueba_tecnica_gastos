from django.shortcuts import render
from .models import TypeOfSavings
from .serializer import CreateTypeOfSavingsSerializer, GetAllTypeOfSavingsSerializer, UpgradeTypeOfSavingsSerializer

# RESTFRAMEWORK
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_type_saving(request):
    data = request.data
    data['user'] = request.user.id
    serializer = CreateTypeOfSavingsSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_savings_by_user(request):
    savings = TypeOfSavings.objects.filter(user=request.user).all()
    serializer = GetAllTypeOfSavingsSerializer(savings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_type_of_savings_by_admin(request):
    savings = TypeOfSavings.objects.all()
    serializer = GetAllTypeOfSavingsSerializer(savings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upgrade_savings(request, id_saving):
    try:
        saving = TypeOfSavings.objects.get(user=request.user, id=id_saving)
    except TypeOfSavings.DoesNotExist:
        return Response({'message': 'The saving is not found'})

    serializer = UpgradeTypeOfSavingsSerializer(saving, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_saving(request, id_saving):
    try:
        saving = TypeOfSavings.objects.get(user=request.user, id=id_saving)
    except TypeOfSavings.DoesNotExist:
        return Response({'message': 'The saving is not found '})
    else:
        saving.delete()
        return Response({'message': 'The saving has been delete'})
