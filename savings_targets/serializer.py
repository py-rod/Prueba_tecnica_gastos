from rest_framework import serializers
from .models import SavingsTargets


class CreateSavingsTargetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsTargets
        fields = ['quantity', 'description', 'init_date', 'last_date']


class GetAllSavingsTargetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsTargets
        fields = '__all__'


class UpgradeSavingsTargetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsTargets
        fields = ['quantity', 'description', 'init_date', 'last_date']
