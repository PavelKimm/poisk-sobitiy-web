from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.response import Response

from src import views
from src.accounts import serializers


class UsersViewSet(views.AdminView, viewsets.ModelViewSet):
    """
        list:
            Returns list of all users with (optional) filtering

            If you need only active users, please use filter with query param is_active=True

        create:
            Create a new user
    """
    serializer_class = serializers.UserSerializer
    model = serializer_class.Meta.model
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = serializer_class.Meta.fields
    pagination_class = views.PageNumberPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        return self.model.objects.order_by('-id')

    def perform_update(self, serializer):
        if self.get_object() == self.request.user and not serializer.validated_data.get('is_active'):
            return Response(status=status.HTTP_403_FORBIDDEN)
        super().perform_update(serializer)

    def perform_destroy(self, instance):
        if instance == self.request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        super().perform_destroy(instance)
