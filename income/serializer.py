from rest_framework import serializers
from .models import Income


class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['quantity', 'description']


class GetAllIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class UpgradeIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['quantity', 'description']
