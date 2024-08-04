from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class Income(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=400)
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.user} - {self.quantity}'

    class Meta:
        verbose_name_plural = 'Incomes'
