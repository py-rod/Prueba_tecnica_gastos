from django.db import models
from type_of_savings.models import TypeOfSavings
from django.contrib.auth import get_user_model
# Create your models here.


class SavingsTargets(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=400)
    type_saving = models.ForeignKey(TypeOfSavings, on_delete=models.CASCADE)
    init_date = models.DateField()
    last_date = models.DateField()

    def __str__(self) -> str:
        return f'{self.user} - {self.quantity} - {self.type_saving}'
