from django.urls import include,path,re_path
from rest_framework import routers
from api.views import UserViewSet

#create route for api app
router = routers.DefaultRouter()
router.register(r'users',UserViewSet)

urlpatterns = [
    path('',include(router.urls)),
    re_path('auth/', include('rest_auth.urls')),
]
