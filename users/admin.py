from django.contrib import admin
from .models import CustomUser
# Register your models here.


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'first_name',
                    'last_name', 'is_active', 'is_superuser', 'created']
    list_display_links = ['id', 'email', 'first_name',
                          'last_name']
    list_editable = ['is_active', 'is_superuser']
    list_filter = ['is_active', 'is_superuser']
    list_per_page = 50
    search_fields = ['id', 'email', 'first_name',
                     'last_name']
