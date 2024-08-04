from django.contrib import admin
from .models import SavingsTargets
# Register your models here.


@admin.register(SavingsTargets)
class SavingsTargetsAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'quantity',
                    'type_saving', 'init_date', 'last_date']
    list_display_links = ['id', 'user']
    list_per_page = 50
    search_fields = ['id', 'user']
