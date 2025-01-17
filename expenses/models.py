from django.db import models
from django.contrib.auth import get_user_model
from type_of_expense.models import TypeOfExpense
# Create your models here.


class Expenses(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=400, default='', blank=True)
    type_expense = models.ForeignKey(TypeOfExpense, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.quantity} - {self.date}'

    class Meta:
        verbose_name_plural = 'Expenses'
