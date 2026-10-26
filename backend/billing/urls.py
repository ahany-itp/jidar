from django.urls import path
from .views import AuditReceiptView

app_name = 'billing'
urlpatterns = [
    path('receipts/<int:pk>/audit/', AuditReceiptView.as_view(), name='audit_receipt'),
]
