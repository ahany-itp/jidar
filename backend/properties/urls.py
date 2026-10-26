from django.urls import path
from .views import BuildingCreateView, BuildingSearchView, BuildingUnitsListView

app_name = 'properties'
urlpatterns = [
    path('buildings/create/', BuildingCreateView.as_view(), name='building_create'),
    path('buildings/search/', BuildingSearchView.as_view(), name='building_search'),
    path('buildings/<int:building_id>/units/', BuildingUnitsListView.as_view(), name='building_units'),
]
