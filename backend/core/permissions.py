from rest_framework.permissions import BasePermission

class IsBOAUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'boa')

class IsResidentUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in ['owner', 'tenant'])
