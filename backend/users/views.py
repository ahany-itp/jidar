from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import RegisterSerializer, UserSummarySerializer

User = get_user_model()

class RegisterUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User registered successfully.",
                "token": str(refresh.access_token),
                "user": UserSummarySerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email', '').lower().strip()
        password = request.data.get('password', '')

        try:
            target_user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if not target_user.check_password(password):
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(target_user)
        return Response({
            "message": "Login successful.",
            "token": str(refresh.access_token),
            "user": UserSummarySerializer(target_user).data
        }, status=status.HTTP_200_OK)

class SelectRoleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        role = request.data.get('role')
        if role not in ['boa', 'owner', 'tenant']:
            return Response({"detail": "Invalid role selected."}, status=status.HTTP_400_BAD_REQUEST)

        request.user.role = role
        request.user.save()
        return Response({
            "message": "Role assigned successfully.",
            "user": UserSummarySerializer(request.user).data
        }, status=status.HTTP_200_OK)
