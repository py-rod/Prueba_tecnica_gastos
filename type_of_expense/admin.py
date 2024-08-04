from django.contrib import admin
from .models import TypeOfExpense
# Register your models here.


@admin.register(TypeOfExpense)
class TypeOfExpenseAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name']
    list_display_links = ['id', 'user', 'name']
    list_per_page = 50
    search_fields = ['id', 'user', 'name']
