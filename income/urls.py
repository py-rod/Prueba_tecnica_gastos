from django.urls import path
from . import views


urlpatterns = [
    path('create_income', views.create_income, name='create_income'),
    path('get_all_income_by_user', views.get_all_income_by_user,
         name='get_all_income_by_user'),
    path('get_all_income_by_admin', views.get_all_income_by_admin,
         name='get_all_income_by_admin'),
    path('upgrade_income/<int:id_income>',
         views.upgrade_income, name='upgrade_income'),
    path('delete_income/<int:id_income>',
         views.delete_income, name='delete_income')

]
