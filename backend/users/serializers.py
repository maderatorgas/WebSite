from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class DeleteAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")
        

        if email and password:
            try:
                user = User.objects.get(email=email)
                attrs["username"] = user.username  # authenticate працює з username
            except User.DoesNotExist:
                raise serializers.ValidationError("Неправильний email або пароль")
        else:
            raise serializers.ValidationError("Email та пароль обов’язкові")

        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Можна додати додаткові claims:
        token["email"] = user.email
        return token