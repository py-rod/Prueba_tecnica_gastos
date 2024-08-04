from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class TypeOfExpense(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = 'Type of expenses'
