from django.urls import path
from . import views


urlpatterns = [
    path('create_savings_targets', views.create_savings_targets,
         name='create_savings_targets'),
    path('get_all_savings_targets_by_user', views.get_all_savings_targets_by_user,
         name='get_all_savings_targets_by_user'),
    path('get_all_savings_targets_by_admin', views.get_all_savings_targets_by_admin,
         name='get_all_savings_targets_by_admin'),
    path('upgrade_savings_target/<int:id_savings_target>', views.upgrade_saving_target,
         name='upgrade_savings_targets'),
    path('delete_saving_target/<int:id_saving_target>',
         views.delete_saving_target, name='delete_saving_target')

]
