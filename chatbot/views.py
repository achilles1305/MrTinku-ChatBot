from django.shortcuts import render
from django.http import JsonResponse
from transformers import pipeline

# Load the text generation model
chatbot = pipeline('text-generation', model='gpt2')

def chat_view(request):
    return render(request, 'chat.html')

def get_response(request):
    user_input = request.GET.get('message')
    # Generate a response from the model
    response = chatbot(user_input, max_length=50, num_return_sequences=1)
    # Extract the text from the response
    generated_text = response[0]['generated_text']
    return JsonResponse({'response': generated_text})
