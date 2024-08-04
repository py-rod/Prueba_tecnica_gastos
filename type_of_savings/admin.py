from django.contrib import admin
from .models import TypeOfSavings
# Register your models here.


@admin.register(TypeOfSavings)
class TypeOfSavingsAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name']
    list_display_links = ['id', 'user', 'name']
    list_per_page = 50
    search_fields = ['id', 'name']
