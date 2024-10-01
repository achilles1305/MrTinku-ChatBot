# chatbot/urls.py
from django.urls import path
from .views import chatbot_response, chat_page

urlpatterns = [
    path('chat/', chatbot_response, name='chatbot_response'),  # API for chatbot responses
    path('', chat_page, name='chat_page'),  # Frontend chat page
]
