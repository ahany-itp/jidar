from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Building, Unit, JoinRequest
from .serializers import BuildingSerializer, UnitSerializer
from core.permissions import IsBOAUser

class BuildingCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsBOAUser]

    def post(self, request):
        serializer = BuildingSerializer(data=request.data)
        if serializer.is_valid():
            building = serializer.save(manager=request.user)
            return Response(BuildingSerializer(building).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BuildingSearchView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        buildings = Building.objects.filter(is_active=True)
        if query:
            buildings = buildings.filter(name__icontains=query) | buildings.filter(address__icontains=query)
        return Response(BuildingSerializer(buildings, many=True).data, status=status.HTTP_200_OK)

class BuildingUnitsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, building_id):
        units = Unit.objects.filter(building_id=building_id)
        return Response(UnitSerializer(units, many=True).data, status=status.HTTP_200_OK)
