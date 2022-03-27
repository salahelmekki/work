from rest_framework import viewsets
from api.models import User
from api.serializers import UserSerializer
from rest_framework import filters
from rest_framework.permissions import AllowAny
from api.permissions import IsLoggedInUserOrAdmin, IsAdminUser
# Create your views here.

#api for list user with filter
class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['userprofile__hometown']
    def get_queryset(self):
        hometown = self.request.query_params.get('hometown')
        hometownf = self.request.query_params.get('hometownf')
        age = self.request.query_params.get('age')
        # filter gender female with age plus 30
        if (hometownf is not None):
            queryset=User.objects.select_related("userprofile").filter(userprofile__hometown__icontains=hometownf).filter(userprofile__gender="Female").filter(userprofile__age__gt=30).all()
        # filter age in range 
        if (age is not None):
            queryset=User.objects.select_related("userprofile").filter(userprofile__age__gt=18, userprofile__age__lt=25).all()
        # filter with hometown 
        if (hometown is not None):
            queryset=User.objects.select_related("userprofile").filter(userprofile__hometown__icontains=hometown).all()
        return queryset
    # only admin can list or delete user && every one can create or update his profile
    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    

