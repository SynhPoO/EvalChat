import JokeBot from './Model/JokeBot.js';
import Message from './Model/Message.js';
import MeteoBot from './Model/MeteoBot.js';
import MovieBot from './Model/MovieBot.js';

const bot1Selectorbtn = document.querySelector('#bot1-selected');
const bot2Selectorbtn = document.querySelector('#bot2-selected');
const bot3Selectorbtn = document.querySelector('#bot3-selected');

const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button')

const command1 = document.querySelector('#command-1');
const command2 = document.querySelector('#command-2');
const command3 = document.querySelector('#command-3');
const exemple = document.querySelector('#command-exemple');

var selectedBot = 'Meteo';

///
// Chargement des messages au refresh de la page
///
window.onload = () => {
    loadMessages('Meteo');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

///
// Création des message en HTML
///
const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'You' ? 'blue-bg' : 'gray-bg'}">
    <div class="avatar">
      <img src="${getAvatar(message.sender)}" alt="Avatar">
    </div>    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

// Recuperation de l'avatar
function getAvatar(sender) {
    if (sender === 'You') {
        return '../public/avatarperson.avif'; 
    } else {
        return '../public/avatarbot.webp'; 
    }
}


///
// Mise à jour du bot selectionné
///
function updateBot(name) {
    selectedBot = name;
    chatHeader.innerText = `${selectedBot}`;
    chatInput.placeholder = `Envoyez votre message aupres de ${selectedBot}`;

    if (name == "Meteo") {
        bot1Selectorbtn.classList.add('active-bot');
        bot2Selectorbtn.classList.remove('active-bot');
        bot3Selectorbtn.classList.remove('active-bot');
    } else if (name == "Blague") {
        bot1Selectorbtn.classList.remove('active-bot');
        bot2Selectorbtn.classList.add('active-bot');
        bot3Selectorbtn.classList.remove('active-bot');
    } else if (name == "Film") {
        bot1Selectorbtn.classList.remove('active-bot');
        bot2Selectorbtn.classList.remove('active-bot');
        bot3Selectorbtn.classList.add('active-bot');
    }
    updateCommand(selectedBot);
    loadMessages(selectedBot);
    chatInput.focus();
}

///
// Mise à jour de l'explication des commandes
///
function updateCommand(selectedBot) {
    switch (selectedBot) {
        case "Meteo":
            command1.innerHTML = "!temp-latitude-longitude";
            command2.innerHTML = "!precip-latitude-longitude";
            command3.innerHTML = "!wind-latitude-longitude";
            exemple.innerHTML = "!temp-48.8566-2.3522";
            break;
        case "Blague":
            command1.innerHTML = "!rjoke";
            command2.innerHTML = "!pjoke";
            command3.innerHTML = "!djoke";
            exemple.innerHTML = "!rjoke";
            break;
        case "Film":
            command1.innerHTML = "!pop";
            command2.innerHTML = "!top";
            command3.innerHTML = "!next";
            exemple.innerHTML = "!pop";
            break;
    }
}

///
// Envoi du message
///
async function sendMessage(e) {
    e.preventDefault();

    var message = new Message("You", selectedBot, chatInput.value);
    storeMessage(selectedBot, message);
    chatMessages.innerHTML += createChatMessageElement(message);

    if (chatInput.value.startsWith('!')) {
        var messageFromBot = JSON.stringify(await botResponse(chatInput.value));
        var botMessage = new Message(selectedBot, selectedBot, formatString(messageFromBot));
        storeMessage(selectedBot, botMessage);
        chatMessages.innerHTML += createChatMessageElement(botMessage);
    }
    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatString(text) {
    return text.replace(/["\n]/g, ' ');
}

///
// stockage des messages dans le local storage
///
function storeMessage(bot, message) {
    console.log(message)
    let messages = JSON.parse(localStorage.getItem(`messages${bot}`)) || [];
    messages.push(message);
    localStorage.setItem(`messages${bot}`, JSON.stringify(messages));
}

///
// Recuperer les messqges en fonctions du bot selectionne
///
function loadMessages(bot) {
    chatMessages.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem(`messages${bot}`)) || [];
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
}

///
// Récupération de la réponse du bot
///
async function botResponse(userText) {
    switch (selectedBot) {
        case "Meteo":
            var meteoBot = new MeteoBot();
            var stringWithoutFirst = userText.substring(1);

            if (stringWithoutFirst == "parleztous") {
                return allBotTalk();
            }

            var parts = stringWithoutFirst.split('-');

            if (parts.length !== 3) {
                return "Veuillez entrer une commande valide";
            }
            var latitude = parts[1];
            var longitude = parts[2];


            switch (parts[0]) {
                case "temp":
                    return meteoBot.getTemperature(latitude, longitude);
                case "precip":
                    return meteoBot.getPrecipitation(latitude, longitude);
                case "wind":
                    return meteoBot.getWindSpeed(latitude, longitude);
                default:
                    return "Veuillez entrer une commande valide";
            }
        case "Blague":
            var jokeBot = new JokeBot();

            switch (userText.substring(1)) {
                case "rjoke":
                    return jokeBot.getRandomJoke();
                case "pjoke":
                    return jokeBot.getProgrammingJoke();
                case "djoke":
                    return jokeBot.getDarkJoke();
                case "parleztous":
                    return allBotTalk();
                default:
                    return "Veuillez entrer une commande valide";
            }
        case "Film":
            var movieBot = new MovieBot();

            switch (userText.substring(1)) {
                case "pop":
                    return movieBot.getPopularMovies();
                case "top":
                    return movieBot.getTopRatedMovies();
                case "next":
                    return movieBot.getUpcomingMovies();
                case "parleztous":
                    return allBotTalk();
                default:
                    return "Veuillez entrer une commande valide";
            }
    }
}

///
// Methode qui fais parler tous les bots
///
function allBotTalk() {
    var meteoMessage = new Message("Meteo", selectedBot, "Salut c'est la meteo et je ne fais pas de blague");
    var blagueMessage = new Message("Blague", selectedBot, "Salut c'est la meteo et je fais une blague");
    var filmMessage = new Message("Film", selectedBot, "Salut c'est les films, et une page de pub");

    switch (selectedBot) {
        case "Meteo":
            storeMessage("Blague", blagueMessage);
            storeMessage("Film", filmMessage);
            return meteoMessage.text;
            break;
        case "Blague":
            storeMessage("Meteo", meteoMessage);
            storeMessage("Film", filmMessage);
            return blagueMessage.text;
            break;
        case "Film":
            storeMessage("Meteo", meteoMessage);
            storeMessage("Blague", blagueMessage);
            return filmMessage.text;
            break;
    }


}

///
// OnClick du bot météo
///
bot1Selectorbtn.onclick = () => {
    updateBot("Meteo");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

///
// OnClick du bot joke
///
bot2Selectorbtn.onclick = () => {
    updateBot("Blague");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

///
// OnClick du bot météo
///
bot3Selectorbtn.onclick = () => {
    updateBot("Film");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

///
// Déclenchement du submit
///
chatInputForm.addEventListener('submit', sendMessage);

///
// Clear du local storage
///
clearChatBtn.addEventListener('click', () => {
    clearMessages(selectedBot);
    chatMessages.innerHTML = '';
})

///
// methode pour clear les messages
///
function clearMessages(selectedBot) {
    switch (selectedBot) {
        case "Meteo":
            localStorage.removeItem('messagesMeteo');
            break;
        case "Blague":
            localStorage.removeItem('messagesBlague');
            break;
        case "Film":
            localStorage.removeItem('messagesFilm');
            break;
    }
}