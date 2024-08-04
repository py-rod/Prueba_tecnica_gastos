from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signin',  views.Singin.as_view(), name='signin'),
    path('logout', views.close_session, name='logout'),
    path('profile', views.get_data_profile, name='get_data_profile'),
    path('profile/upgrade', views.update_profile, name='update_profile'),
    path('delete/user/<int:id>', views.delete_user, name='delete_user'),

    # ADMIN MODE
    path('all_data_user_as_admin', views.obtain_all_user_data_as_admin,
         name='all_data_user_as_admin'),
    path('obtain_data_user_as_admin/user/<int:id>', views.obtain_user_data_as_admin,
         name='obtain_data_user_as_admin'),

]
