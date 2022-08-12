# This file is use to create a Custom Login Required Mixin 

# Import User
from apps.users.models import User

# Import Response 
from rest_framework.response import Response

# Import JSONRenderer 
from rest_framework.renderers import JSONRenderer

# Import status
from rest_framework import status

# Import datetime
import datetime

# Create CustomLoginRequiredMixin class to provide additional features to other classes; used in classes that require login

class CustomLoginRequiredMixin():

    # Define a dispatch method that returns a response based on requests
    def dispatch(self, request, *args, **kwargs):

        # Check if the headers of request contains Authorization
        if 'Authorization' not in request.headers:

            # If not authorized return a 'Response' w/ an request error: error message and a response error: status code response
            response = Response({"Error": "Please set Auth-token."}, status=status.HTTP_404_NOT_FOUND)

            # Set 'accepted_renderer' instance that will be used to render response
            response.accepted_renderer = JSONRenderer()

            # Set 'accepted_media_type' instance to media-type set by content-type
            response.accepted_media_type = "application/json"

            # Set 'renderer_context' instance to a dictionary that passes additional context info to renderer's method
            response.renderer_context = {}

            # Return Info
            return response

        # Set token instance header to authorization to grant access
        token = request.headers['Authorization']
        # Set instance to current time and date
        now = datetime.datetime.now()
        # Set instance to filtered user by token / expiration greater than current time / date
        login_user = User.objects.filter(token=token, token_expires_at__gt=now)

        # Check if login user token is valid or expired
        if len(login_user) == 0:

            # If token is not valid / expired return a 'Response'
            response = Response({"Error": "The token is invalid or expired."}, status=status.HTTP_404_NOT_FOUND)

            # Set 'accepted_renderer' instance that will be used to render response
            response.accepted_renderer = JSONRenderer()

            # Set 'accepted_media_type' instance to media-type set by content-type
            response.accepted_media_type = "application/json"

            # Set 'renderer_context' instance to a dictionary that passes additional context info to renderer's method
            response.renderer_context = {}

            # Return Info
            return response

        # Set filtered user to current user
        request.login_user = login_user[0]

        # Return dispatch method request response
        return super().dispatch(request, *args, **kwargs)





