const wssUrl = "wss://echo-ws-service.herokuapp.com";

const fieldOfMessanges = document.querySelector(".fieldOfMessanges");
const buttonSend = document.querySelector(".control__send");
const buttonGeolocation = document.querySelector(".control__geolocation");
const enterTextMessage = document.querySelector(".control__enterTextMessage");

const server = new WebSocket(wssUrl);

let flagPushedButtonGeolocation = false;

buttonSend.addEventListener("click", () => {
    const text = enterTextMessage.value;

    if (text === "")
        return;

    enterTextMessage.value = "";

    server.send(text);
    
    newMessage(text, "message messageFromUser");
});

buttonGeolocation.addEventListener("click", () => {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {coords} = position;

            const linkGeolocation = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            server.send(linkGeolocation);
            newMessage(`<a href="${linkGeolocation}" target="_blink">${linkGeolocation}</a>`, "message messageFromUser");

        });
    } else {
        alert("Браузер не поддерживает Геолокацию");
    }

    flagPushedButtonGeolocation = true;
});

server.onmessage = (event) => {

    if (flagPushedButtonGeolocation) {
        flagPushedButtonGeolocation = false;
        return;
    }

    newMessage(event.data, "message messageFromServer");
};

function newMessage(text, className) {
    const message = document.createElement("p");
    message.className = className;
    message.innerHTML = text;
    
    fieldOfMessanges.append(message);
}

