from django.contrib.auth import views
from django.urls import path
from rest_auth.views import PasswordChangeView, PasswordResetView  #, PasswordResetConfirmView

from .views import UsersViewSet


urlpatterns = [
    path('', UsersViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('<int:pk>/', UsersViewSet.as_view({
        'patch': 'partial_update',
        'delete': 'destroy',
    })),


    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    # path('password/reset/confirm/', PasswordResetConfirmView.as_view(),
    #      name='rest_password_reset_confirm'),
    path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
