from django.urls import path
from . import views


urlpatterns = [
    path('create_income', views.create_income, name='create_income'),

]
