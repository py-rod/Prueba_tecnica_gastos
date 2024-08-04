from rest_framework import serializers
from .models import TypeOfSavings


class CreateTypeOfSavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfSavings
        fields = ['name']


class GetAllTypeOfSavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfSavings
        fields = '__all__'


class UpgradeTypeOfSavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfSavings
        fields = ['name', ]
