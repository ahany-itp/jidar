from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Charge, Receipt
from core.permissions import IsBOAUser

class AuditReceiptView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsBOAUser]

    def patch(self, request, pk):
        receipt = get_object_or_404(Receipt, pk=pk, status='pending')
        action = request.data.get('action')
        notes = request.data.get('notes', '')

        if action == 'approve':
            receipt.status = 'approved'
            receipt.audit_notes = notes
            receipt.verified_at = timezone.now()
            receipt.save()

            charge = receipt.charge
            charge.is_cleared = True
            charge.save()
            return Response({"status": "success", "message": "Receipt approved. Charge cleared."})
        elif action == 'reject':
            receipt.status = 'rejected'
            receipt.audit_notes = notes
            receipt.verified_at = timezone.now()
            receipt.save()
            return Response({"status": "success", "message": "Receipt rejected."})

        return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
