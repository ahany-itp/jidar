from rest_framework import serializers
from .models import Building, Unit, JoinRequest

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('id', 'name', 'address', 'total_floors', 'units_per_floor', 'is_active')

    def create(self, validated_data):
        building = Building.objects.create(**validated_data)
        units = []
        for floor in range(1, validated_data['total_floors'] + 1):
            for idx in range(1, validated_data['units_per_floor'] + 1):
                units.append(Unit(
                    building=building,
                    floor_number=floor,
                    unit_number=f"{floor}{idx:02d}",
                    status='vacant'
                ))
        Unit.objects.bulk_create(units)
        return building

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'
