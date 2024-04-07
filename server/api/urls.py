from django.urls import path
from . import views

urlpatterns = [
  
    path('api/signup/',views.signup),
    path('api/login/',views.login),
    path('api/predict',views.predict),
    path('api/user/<int:pk>',views.get_user_profile_by_id),
    path('api/predictions',views.get_predictions),
    path('scrape-instagram/', views.scrape_instagram_data, name='scrape_instagram_data'),
]

