import openai
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render

def chat_page(request):
    return render(request, 'chatbot/chat.html')

# Set your OpenAI API key
openai.api_key = "your_api_key_here"

def chatbot_response(request):
    if request.method == 'POST':
        user_input = request.POST.get('message')
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful chatbot named Tinku."},
                    {"role": "user", "content": user_input},
                ],
                max_tokens=150,
            )
            
            chatbot_reply = response.choices[0].message['content'].strip()
            return JsonResponse({"response": chatbot_reply})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"response": "Send a POST request with your message."})
