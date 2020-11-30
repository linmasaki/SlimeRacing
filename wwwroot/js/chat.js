"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


connection.on("ReceiveMove", function () {

    let slime1 = document.getElementById("slime1");    

    //var rect = slime1.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);

    slime1.style.left= slime1.getBoundingClientRect().left + 2 + "px";   

    let slime2 = document.getElementById("slime2");
    slime2.style.left = slime2.getBoundingClientRect().left + 1 + "px"; 

    let slime3 = document.getElementById("slime3");
    slime3.style.left = slime3.offsetLeft + 0.1 + "px"; 

    let slime4 = document.getElementById("slime4");
    slime4.style.left = slime4.offsetLeft + 0.01 + "px";

    if(slime1.offsetLeft > 500)
        connection.invoke("DisableMoveButton").catch(function (err) {
            return console.error(err.toString());
        });
});

connection.on("DisableMove", function () {
    document.getElementById("move1").disabled = true;
});



document.getElementById("move1").addEventListener("click", function (event) {
    event.preventDefault();
    connection.invoke("MoveIt").catch(function (err) {
        return console.error(err.toString());
    });
});