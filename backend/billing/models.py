from django.db import models
from django.conf import settings
from properties.models import Unit

class Charge(models.Model):
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='charges')
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()
    is_cleared = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Receipt(models.Model):
    charge = models.ForeignKey(Charge, on_delete=models.CASCADE, related_name='receipts')
    submitter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='uploaded_receipts')
    image = models.ImageField(upload_to='receipts/')
    declared_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, default='pending', choices=(('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')))
    audit_notes = models.TextField(null=True, blank=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
