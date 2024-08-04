from rest_framework import serializers
from .models import TypeOfExpense


class CreateTypeOfExpense(serializers.ModelSerializer):
    class Meta:
        model = TypeOfExpense
        fields = ['name',]


class GetAllTypeOfExpense(serializers.ModelSerializer):
    class Meta:
        model = TypeOfExpense
        fields = '__all__'


class UpgradeTypeOfExpense(serializers.ModelSerializer):
    class Meta:
        model = TypeOfExpense
        fields = ['name',]
