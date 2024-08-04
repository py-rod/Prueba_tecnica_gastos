from django.urls import path
from . import views


urlpatterns = [
    path('create_type_expense', views.create_type_of_expense,
         name='create_type_expenses'),
    path('get_all_expenses_by_user', views.get_type_of_expenses_by_user,
         name='get_all_extenses_by_user'),
    path('get_all_extenses_by_admin', views.get_all_type_of_expenses_by_admin,
         name='get_all_extenses_by_admin'),
    path('upgrade_type_expense/<int:id_expense>',
         views.upgrade_type_expense, name='upgrade_type_expense'),
    path('delete_type_expense/<int:id_expense>',
         views.delete_type_expense, name='delete_type_expense')
]
