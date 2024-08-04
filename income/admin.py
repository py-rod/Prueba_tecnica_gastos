from django.contrib import admin
from .models import Income
# Register your models here.


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'quantity', 'date']
    list_display_links = ['id', 'user']
    list_per_page = 50
    search_fields = ['id', 'user']
