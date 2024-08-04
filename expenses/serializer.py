from .models import Expenses
from rest_framework import serializers


class CreateExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = ['quantity', 'description']


class GetExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'


class UpgradeExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = ['quantity', 'description']
