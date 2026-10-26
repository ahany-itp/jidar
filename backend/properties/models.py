from django.db import models
from django.conf import settings

class Building(models.Model):
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='managed_buildings')
    name = models.CharField(max_length=255)
    address = models.TextField()
    total_floors = models.PositiveIntegerField()
    units_per_floor = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Unit(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='units')
    floor_number = models.IntegerField()
    unit_number = models.CharField(max_length=50)
    status = models.CharField(max_length=15, default='vacant', choices=(('vacant', 'Vacant'), ('occupied', 'Occupied')))
    active_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='owned_units')
    active_tenant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='rented_units')

    class Meta:
        unique_together = ('building', 'floor_number', 'unit_number')

    def __str__(self):
        return f"{self.building.name} - Unit {self.unit_number}"

class JoinRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='join_requests')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='requests')
    target_role = models.CharField(max_length=10, choices=(('owner', 'Owner'), ('tenant', 'Tenant')))
    status = models.CharField(max_length=10, default='pending', choices=(('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')))
    rejection_reason = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
