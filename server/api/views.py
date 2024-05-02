from rest_framework.response import Response    
from rest_framework import status
from Insightio.models import User,Prediction
from .serializers import UserSerializer,PredictionSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
import jwt
import datetime
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from django.http import JsonResponse
from scrapeomatic.collectors.instagram import Instagram
from tensorflow.keras.models import load_model
import numpy as np
import json

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()
    
    if user:
        if check_password(password, user.password):            
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=48),
                'iat': datetime.datetime.utcnow()
            }
                                
            token = jwt.encode(payload, key='secret', algorithm="HS256")
            response = Response()
            response.data = {
                'jwt': token,
                'status': 'success',
                'id': user.id,
            }
            return response
        else:
            return Response({'status': 'error', 'message': 'Wrong Password'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def signup(request):
    email = request.data.get('email')    
    user_email = User.objects.filter(email=email).first()
   
    if user_email is None:            
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():    
            serializer.save()
            return Response({'status': 'success', 'message': 'Data added successfully','email': email}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error', 'message': 'Failed to add data'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'status': 'error', 'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

with open('./api/data.json', 'r') as file:
    json_data = json.load(file)

features = [list(profile.values())[:-1] for profile in json_data]

dummy_data = np.array(features)

scaler = StandardScaler()
scaler.fit(dummy_data)
                
@api_view(['POST'])
def predict(request):
    user_name = request.data.get('username')
    instagram_scraper = Instagram()
    user_name = str(user_name) 
    try:
        results = instagram_scraper.collect(user_name)
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message':e})
    
    
    if results:
        ann_model = load_model("./Insightio/ann_model.h5")                        
        profile_pic = results['profile_pic_url']
        if(profile_pic):
            profile_pic = True
        features = [
            results['edge_followed_by']['count'], 
            results['edge_follow']['count'],
            len(results['biography_with_entities']['raw_text']),
            results["edge_owner_to_timeline_media"]['count'],  
            profile_pic,  
            results['is_private'],  
            len([i for i in user_name if i.isdigit()]),
            len(user_name)
        ]
        if(results):
            X_scaled = scaler.transform(np.array(features).reshape(1, -1))
            predictions = (ann_model.predict(X_scaled) > 0.5).astype(int)  
            data = {
                'username': user_name,
                'profilePhoto': results['profile_pic_url'],
                'prediction': predictions[0][0]
            }          
            serializer = PredictionSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            return Response({'prediction': predictions[0][0],"results":results})
        else:
            return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_200_OK)
    else:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_200_OK)
        


@api_view(['GET'])
def scrape_instagram_data(request):
    user_name = "aaasdasdadasas asdasf asf as f asf"
    instagram_scraper = Instagram()
    results = instagram_scraper.collect(user_name)
    
    return JsonResponse(results)

@api_view(['GET'])
def get_predictions(request):
    predictions = Prediction.objects.all()
    serializer = PredictionSerializer(predictions, many=True)
    if predictions:
        return Response(serializer.data)
    else:
        return Response({'status': 'error', 'message': 'No predictions found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_user_profile_by_id(request, pk):
    user = User.objects.filter(id=pk).first()
    if user:
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
