from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allows access only to admin users.
    """
    message = "Доступ запрещен!"

    def has_permission(self, request, view):
        try:
            return request.user.is_admin
        except AttributeError:
            return False
