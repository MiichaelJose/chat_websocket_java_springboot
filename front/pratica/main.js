let stompClient = null;

let areatext = document.querySelector('.textos')

function connectToChat() {
    let name = document.querySelector("#name").value

    console.log("connecting to chat...")
    let socket = new SockJS('http://192.168.0.104:8080/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log("connected to: " + frame);
        // faz a conexão com o servidor via websocket e ja identica quem fez a conexao (name)
        stompClient.subscribe("/topic/messages/" + name, function (response) {
            // caso essa conexao receber uma message ira retornar essa informação
           console.log(name);
           
            let data = JSON.parse(response.body);
            
            console.log(data);

            let p = document.createElement('p')
            
            p.innerHTML = data.text

            areatext.appendChild(p)
        });
    });
}

function sendMsg() {
    let name = document.querySelector("#name").value
    let toMessage = document.querySelector('#toMessage').value
    let message = document.querySelector("#message").value

    stompClient.send("/app/chat/"+toMessage, {}, JSON.stringify({
        text: message,
        remetente: name
    }));


    let msg = document.createElement('p')
    let box_msg = document.createElement('div')

    box_msg.className = 'box_mensagem'

    msg.innerHTML = name + ": " + message

    box_msg.appendChild(msg)

    areatext.appendChild(box_msg)

    toMessage.innerHTML = ''
    console.log('message '+ message);
}

// var stompClient = null;
// var privateStompClient = null;

// var socket = new SockJS('http://192.168.0.103:8080/ws');
// stompClient = Stomp.over(socket);
// stompClient.connect({}, function(frame) {
//     console.log(frame);
//     stompClient.subscribe('/all/messages', function(result) {
//         show(JSON.parse(result.body));
//     });
// });

// socket = new SockJS('http://192.168.0.103:8080/ws');


// privateStompClient = Stomp.over(socket);
// console.log(privateStompClient);
// privateStompClient.connect({}, function(frame) {
//         //console.log("FRAME " + frame);
//         privateStompClient.subscribe('/user/specific', function(result) {
//         console.log("RESULT " + JSON.parse(result.body))
//             //show(JSON.parse(result.body));
//         });
//     });


// function sendMessage() {
//   var text = document.getElementById('text').value;
//   stompClient.send("/app/application", {},
//     JSON.stringify({'text':text}));
// }

// function sendPrivateMessage() {
//   var text = document.getElementById('privateText').value;
//   var to = document.getElementById('to').value;
//   stompClient.send("/app/private", {},
//     JSON.stringify({'text':text, 'to':to}));
// }

// function show(message) {
//     var response = document.getElementById('messages');
//     var p = document.createElement('p');
//     p.innerHTML= "message: "  + message.text;
//     response.appendChild(p);
// }


// function teste() {
//     fetch('http://192.168.0.103:8080/test')
//     .then((response) => {
//         return response
//     })
//     .then((data) => {
//         console.log(data);
//     })
    
// }
// // Try to set up WebSocket connection with the handshake at "http://localhost:8080/stomp"
// let sock = new SockJS("http://192.168.0.103:8080/ws");

// // Create a new StompClient object with the WebSocket endpoint
// let client = Stomp.over(sock);

// // Start the STOMP communications, provide a callback for when the CONNECT frame arrives.
// client.connect({}, frame => {
//     // Subscribe to "/topic/messages". Whenever a message arrives add the text in a list-item element in the unordered list.
//     client.subscribe("/topic/messages", payload => {
    
//         let message_list = document.getElementById('message-list');
//         let message = document.createElement('li');
        
//         message.appendChild(document.createTextNode(JSON.parse(payload.body).message));
//         message_list.appendChild(message);

//     });

// });

// // Take the value in the ‘message-input’ text field and send it to the server with empty headers.
// function sendMessage(){

//     let input = document.getElementById("message-input");
//     let message = input.value;
    
//     client.send('/app/chat', {}, JSON.stringify({message: message}));

// }