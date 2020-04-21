from rest_framework import authentication, pagination
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response

from src import permissions


class AuthenticatedView:
    """
    Class view for default authenticated users
    """
    authentication_classes = [authentication.TokenAuthentication]


class AdminView(AuthenticatedView):
    """
    Class view for admin users
    """
    permission_classes = [permissions.IsAdmin]


class PageNumberPagination(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'
    page_size = 20
    max_page_size = 1000
