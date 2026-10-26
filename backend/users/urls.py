from django.urls import path
from .views import RegisterUserView, LoginUserView, SelectRoleView

app_name = 'users'
urlpatterns = [
    path('auth/register/', RegisterUserView.as_view(), name='register'),
    path('auth/login/', LoginUserView.as_view(), name='login'),
    path('profile/select-role/', SelectRoleView.as_view(), name='select_role'),
]
