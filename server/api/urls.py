from django.urls import path
from . import views

urlpatterns = [
  
    path('api/signup/',views.signup),
    path('api/login/',views.login),
    path('api/predict',views.predict),
     path('scrape-instagram/', views.scrape_instagram_data, name='scrape_instagram_data'),
]

