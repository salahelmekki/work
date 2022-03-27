from rest_framework import serializers
from api.models import User, UserProfile

# serializer  model profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('hometown', 'age', 'gender')
# serializer  model User
class UserSerializer(serializers.HyperlinkedModelSerializer):
    userprofile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'email', 'first_name', 'last_name', 'password', 'userprofile')
        extra_kwargs = {'password': {'write_only': True}}
    # create  user
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user
    # update  user
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.hometown = profile_data.get('hometown', profile.title)
        profile.age = profile_data.get('age', profile.age)
        profile.gender = profile_data.get('gender', profile.gender)
        profile.save()

        return instance
