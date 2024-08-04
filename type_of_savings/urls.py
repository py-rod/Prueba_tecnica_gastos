from django.urls import path
from . import views


urlpatterns = [
    path('create_savings', views.create_type_saving, name='create_savings'),
    path('get_all_savings_by_user', views.get_savings_by_user,
         name='get_all_savings_by_user'),
    path('get_all_savings_by_admin', views.get_all_type_of_savings_by_admin,
         name='get_all_savings_by_admin'),
    path('upgrade_saving/<int:id_saving>',
         views.upgrade_savings, name='upgrade_saving'),
    path('delete_saving/<int:id_saving>',
         views.delete_saving, name='delete_saving')
]
