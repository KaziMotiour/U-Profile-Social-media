from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import singupSerializer


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        print(request.user)
        content = {'message': 'Hello, World!'}
        return Response(content)
class CreateNewUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer_data = singupSerializer(data=request.data)
        if serializer_data.is_valid():
            new_user = serializer_data.save()
            if new_user:
                content = {'message': 'Hello, World!'}
                return Response(content, status=status.HTTP_201_CREATED)
        return Response(serializer_data.errors, status=status.HTTP_400_BAD_REQUEST)