"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/racehub").build();

connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ResetEvent", function ()
{
    document.getElementById("goButton").disabled = false;
});

connection.on("ReadyEvent", function (timer)
{
    let indicatorImg = document.getElementById("indicatorImg");
    indicatorImg.src = "/images/slime/R"+timer+".png";
});

document.getElementById("goButton").addEventListener("click", function (event) {
    event.preventDefault();
    let id = parseInt(event.target.getAttribute('data-id'),10);
    connection.invoke("MoveIt", id, Math.floor(Math.random() * 6) + 1).catch(function (err) {
        return console.error(err.toString());
    });
});

connection.on("ReceiveRank", function (rank)
{
    let id = parseInt(document.getElementById("goButton").getAttribute('data-id'),10);
    var currentRank = rank.findIndex((element) => element == id) + 1;
    document.getElementById("indicatorImg").src = "/images/slime/R"+ currentRank +".png";
});

connection.on("GameOver", function (rank)
{
    document.getElementById("goButton").disabled = true;
    if(rank[0] == parseInt(document.getElementById("goButton").getAttribute('data-id'),10))
        document.getElementById("indicatorImg").src = "/images/slime/win.png";
    else 
        document.getElementById("indicatorImg").src = "/images/slime/gj.png";
});