from django.urls import path
from .views import (
    UserListCreateView, UserDetailView, RegisterUserView,
    PasswordResetView, PasswordResetConfirmView,
    DeleteAccountRequestView, DeleteAccountConfirmView
)


urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('/<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('register/', RegisterUserView.as_view(), name='user-register'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uuid:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('delete-account/', DeleteAccountRequestView.as_view(), name='delete-account'),
    path('delete-account-confirm/<uuid:uid>/<str:token>/', DeleteAccountConfirmView.as_view(), name='delete-account-confirm'),
]
