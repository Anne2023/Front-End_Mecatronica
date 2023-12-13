from django.urls import path
from app.views.users.createUserView import CreateUserView
from app.views.users.deleteUserView import DeleteUserView
from app.views.users.getUserView import GetUserView
from app.views.users.listUserView import ListUserView
from app.views.users.updateUserView import UpdateUserView
from app.views.sensors.receiveSensorDataView import (
    ReceiveSensorDataGetByIdView,
    ReceiveSensorDataPostView,
    ReceiveSensorDataGetView,
    ReceiveSensorDataPutView,
    ReceiveSensorDataDeleteView,
    SecuryModeCreateView,
    SecuryModeRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Routes for users
    path('users/', ListUserView.as_view(), name='user-list'),
    path('users/create/', CreateUserView.as_view(), name='user-create'),
    path('users/<int:pk>/', GetUserView.as_view(), name='user-retrieve'),
    path('users/<int:pk>/update/', UpdateUserView.as_view(), name='user-update'),
    path('users/<int:pk>/delete/', DeleteUserView.as_view(), name='user-delete'),

    # Routes for sensor data
    path('sensor-data/', ReceiveSensorDataGetView.as_view(), name='sensor-data-list'),
    path('sensor-data/create/', ReceiveSensorDataPostView.as_view(), name='sensor-data-create'),
    path('sensor-data/<int:pk>/update/', ReceiveSensorDataPutView.as_view(), name='sensor-data-update'),
    path('sensor-data/<int:pk>/delete/', ReceiveSensorDataDeleteView.as_view(), name='sensor-data-delete'),
    path('sensor-data/<int:pk>/', ReceiveSensorDataGetByIdView.as_view(), name='sensor-data-get'),
    
    # Routes for security mode
    path('secury-mode/', SecuryModeCreateView.as_view(), name='secury-mode-create'),
    path('secury-mode/<int:pk>/', SecuryModeRetrieveUpdateDestroyView.as_view(), name='secury-mode-retrieve-update-destroy'),
]
