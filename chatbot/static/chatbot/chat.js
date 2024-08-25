document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatPopup = document.getElementById("chat-popup");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    // Toggle chat pop-up visibility
    chatIcon.addEventListener("click", function () {
        chatPopup.classList.toggle("show");
    });

    // Handle sending messages
    sendBtn.addEventListener("click", function () {
        const message = userInput.value.trim();
        if (message) {
            addMessage("You", message);
            userInput.value = ""; // Clear input
            sendMessageToBackend(message);
        }
    });

    // Function to send message to the backend
    function sendMessageToBackend(message) {
        fetch('/chat-response/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')  // Handle CSRF token
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            addMessage("Tinku", data.response);
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Function to add a message to the chat
    function addMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    }
});
