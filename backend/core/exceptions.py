from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def global_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        return Response({
            "status": "error",
            "data": {},
            "error": {
                "code": response.status_code,
                "message": response.data.get('detail', str(response.data))
            }
        }, status=response.status_code)

    return Response({
        "status": "error",
        "data": {},
        "error": {
            "code": 500,
            "message": "An unexpected server crash occurred."
        }
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
