from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from .serializer import RegisterUserSerializer, GetDataUSerSerializer, MyTokenObtainPairSerializer, GetAllDataUSerSerializer, UserUpdateDataSerializer
from django.contrib.auth.hashers import make_password

# RESTFRAMEWORK
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.


@api_view(['POST'])
def signup(request):
    form = request.data
    serializer = RegisterUserSerializer(data=form)
    if serializer.is_valid():
        user = get_user_model().objects.create(
            first_name=form['first_name'],
            last_name=form['last_name'],
            email=form['email'],
            password=make_password(form['password'])
        )
        serializer = RegisterUserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Singin(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def close_session(request):
    refres_token = RefreshToken(request.data['refresh'])
    refres_token.blacklist()
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_data_profile(request):
    serializer = GetDataUSerSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def obtain_all_user_data_as_admin(request):
    users = get_user_model().objects.all()
    serializer = GetAllDataUSerSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def obtain_user_data_as_admin(request, id):
    user = get_user_model().objects.get(id=id)
    serializer = GetDataUSerSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = get_user_model().objects.get(id=request.user.id)
    serializer = UserUpdateDataSerializer(user, request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, id):
    user = get_user_model().objects.get(id=id)
    user.delete()
    return Response({'message': 'The user has been delete'}, status=status.HTTP_200_OK)
