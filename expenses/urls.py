from django.urls import path
from . import views


urlpatterns = [
    path('create_expenses', views.create_expenses, name='create_expenses'),
    path('upgrade/<int:id_expense>',
         views.upgrade_expenses, name='uprgade_expense'),
    path('get_expense_user', views.get_expenses_by_user, name='get_expense_user'),
    path('get_all_expenses_by_admin', views.get_all_expenses_by_admin,
         name='get_all_expenses_by_admin'),
    path('delete_expense/<int:id_expense>',
         views.delete_expense_by_user, name='delete_expense'),
]
