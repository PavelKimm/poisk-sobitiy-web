from django.urls import path, include
from rest_auth.views import PasswordChangeView, PasswordResetView, PasswordResetConfirmView


urlpatterns = [
    # path('password-reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('auth/', include('djoser.urls.authtoken')),

    path('', include('django.contrib.auth.urls')),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(),
         name='rest_password_reset_confirm'),
]
