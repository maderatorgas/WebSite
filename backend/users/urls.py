from django.urls import path
from .views import (
    UserListView, UserDetailView, RegisterUserView,
    PasswordResetView, PasswordResetConfirmView,
    DeleteAccountRequestView, DeleteAccountConfirmView,MyTokenObtainPairView
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', UserListView.as_view(), name='user-list-create'),
    path('<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('register/', RegisterUserView.as_view(), name='user-register'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('delete-account/', DeleteAccountRequestView.as_view(), name='delete-account'),
    path('delete-account-confirm/<uuid:uid>/<str:token>/', DeleteAccountConfirmView.as_view(), name='delete-account-confirm'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
