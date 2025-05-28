from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from .tokens import account_action_token
from .serializers import (
    UserSerializer, UserCreateSerializer,
    PasswordResetSerializer, DeleteAccountSerializer
)

User = get_user_model()


class UserListCreateView(mixins.ListModelMixin,
                        mixins.CreateModelMixin,
                        generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def get(self, request):
        self.serializer_class = UserSerializer
        return self.list(request)

    def post(self, request):
        return self.create(request)


class UserDetailView(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def get(self, request, pk):
        return self.retrieve(request, pk=pk)

    def put(self, request, pk):
        return self.update(request, pk=pk)

    def delete(self, request, pk):
        return self.destroy(request, pk=pk)


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        send_mail(
            subject="Welcome to Our Service",
            message="You have successfully registered.",
            from_email=None,
            recipient_list=[user.email],
            fail_silently=False,
        )


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            token = default_token_generator.make_token(user)
            uid = str(user.id)
            url = request.build_absolute_uri(
                reverse('password-reset-confirm', kwargs={'uid': uid, 'token': token})
            )
            send_mail(
                subject="Password reset",
                message=f"Reset your password, Click the link to reset your password: {url}",
                from_email=None, 
                recipient_list=[user.email],
                fail_silently=False,
            )
        return Response({'message': 'If user exists, reset email sent.'})


class PasswordResetConfirmView(APIView):
    def post(self, request, uid, token):
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Password is required'}, status=400)

        user = User.objects.filter(pk=uid).first()
        if user and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({'message': 'Password reset successful'})
        return Response({'error': 'Invalid token or user'}, status=400)


class DeleteAccountRequestView(APIView):
    def post(self, request):
        serializer = DeleteAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            token = account_action_token.make_token(user)
            uid = str(user.id)
            url = request.build_absolute_uri(
                reverse('delete-account-confirm', kwargs={'uid': uid, 'token': token})
            )
            send_mail(
                subject="Confirm delete account",
                message=f"Confirm account deletion, To delete your account, click: {url}",
                from_email=None, 
                recipient_list=[user.email],
                fail_silently=False,
            )
        return Response({'message': 'If user exists, deletion email sent.'})


class DeleteAccountConfirmView(APIView):
    def get(self, request, uid, token):
        user = User.objects.filter(pk=uid).first()
        if user and account_action_token.check_token(user, token):
            user.delete()
            return Response({'message': 'Account deleted successfully'})
        return Response({'error': 'Invalid or expired token'}, status=400)
