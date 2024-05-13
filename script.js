document.getElementById("user-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    displayMessage("You", userInput);

    var response = getResponse(userInput, responses);
    displayMessage("Bot", response);

    document.getElementById("user-input").value = "";
}

function displayMessage(sender, message) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("div");
    var index = 0;

    if (sender === "Bot") {
		messageElement.className="response";
        var typingEffect = setInterval(function() {
            if (index < message.length) {
				
                messageElement.textContent += message[index];
                index++;
            } else {
                clearInterval(typingEffect);
                
                var audio = new Audio('badumts.mp3');
                audio.play();
            }
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 50); // delay
    } else {
        
        messageElement.textContent = sender + ": " + message;
    }

    chatContainer.appendChild(messageElement);
}

function getResponse(userInput, responses) {
	userInput = userInput.toLowerCase();
    for (var tag in responses) {
        if (userInput.includes(tag.toLowerCase())) {
            return responses[tag];
        }
    }
    return "Nie rozumiem pytania, jeżeli chcesz poznać moje funkcjonalności poproś o pomoc.";
}


var responses = {
    "kawał": "No to zobaczymy: Co to jest? Wchodzi jednym uchem, wychodzi drugim, a zostaje w głowie?                          kilof",
	"elektryk": "Co robi elektryk na scenie?                           buduje napięcie",
	"ogrodnik": "Co mówi ogrodnik do ogrodnika?                  przesadziłeś",
	"murarz": "Jakie jest ulubione powiedzenie murarza?                   Na mur beton.",
    "pomoc": "Jestem specjalistą od opowiadania kawałów, szczególnie o różnych zawodach, pozostałe dostępne komendy: /pogoda, /wersja",
	"/pogoda": "Pytanie już było, wejdź na pogoda.interia.pl",
	"zawody": "Mam coś o elektruku, o murarzu, o ogrodniku...",
	"/wersja": "Wersja systemu: 0.01"
    // additional responses
};

displayMessage("Info", "Witamy w centrum obsługi. Podaj temat, który cię interesuje, może opowiedzieć kawał? Zawsze możesz też poprosić o pomoc.");
