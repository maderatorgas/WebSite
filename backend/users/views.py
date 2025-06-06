from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from .tokens import account_action_token
from .serializers import (
    UserSerializer, UserCreateSerializer,
    PasswordResetSerializer, DeleteAccountSerializer,MyTokenObtainPairSerializer
)

User = get_user_model()


class UserListView(mixins.ListModelMixin,
                        generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def get(self, request):
        self.serializer_class = UserSerializer
        return self.list(request)



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
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            token = default_token_generator.make_token(user)
            uid = str(user.id)
            url = f"http://localhost:3000/reset-password?uid={uid}&token={token}"
            
            send_mail(
                subject="Password reset",
                message=f"Reset your password, Click the link to reset your password: {url}",
                from_email=None, 
                recipient_list=[user.email],
                fail_silently=False,
            )
        return Response({'message': 'If user exists, reset email sent.'})


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        password = request.data.get('password')
        print(uid,token,password)

        if not all([uid, token, password]):
            return Response({'error': 'uid, token, and password are required'}, status=400)

        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({'message': 'Password reset successful'})
        else:
            return Response({'error': 'Invalid token'}, status=400)


class DeleteAccountRequestView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]
    
    def get(self, request, uid, token):
        user = User.objects.filter(pk=uid).first()
        if user and account_action_token.check_token(user, token):
            user.delete()
            return Response({'message': 'Account deleted successfully'})
        return Response({'error': 'Invalid or expired token'}, status=400)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer   
