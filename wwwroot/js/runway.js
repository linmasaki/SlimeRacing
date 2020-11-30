"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/racehub").build();

connection.start().then(function () {
    connection.invoke("Initialize").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});

/* 設定各 Slime 起始畫面 */
connection.on("Preparing", function (horsePositions)
{
    for(let i=0; i<horsePositions.length; i++)
    {
        let slime = document.getElementById("slime" + i);
        slime.style.left= horsePositions[i] + "%";  
    }
});

document.getElementById("resetButton").addEventListener("click", function (event) {
    connection.invoke("Reset").catch(function (err) {
        return console.error(err.toString());
    });
});

connection.on("ResetEvent", function ()
{
    let slimes = document.getElementsByClassName("slime");
    Array.prototype.forEach.call(slimes, function(el) {
        el.style.left = "0px";
    });
    document.getElementById("rankBox").style["display"] = "none";
});

document.getElementById("readyButton").addEventListener("click", function (event) {
    document.getElementById("indicator").style["display"] = "inline";
    connection.invoke("Ready").then(function (){
        document.getElementById("indicator").style["display"] = "none";
        document.getElementById("indicatorImg").src = "/images/slime/R3.png";
    }).catch(function (err) {
        return console.error(err.toString());
    });
});

connection.on("ReadyEvent", function (timer)
{
    let indicatorImg = document.getElementById("indicatorImg");
    indicatorImg.src = "/images/slime/R"+timer+".png";
});

connection.on("ReceiveMove", function (id, currentPosition)
{
    //var rect = slime1.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);

    let slime = document.getElementById("slime" + id);
    //slime.style.left= slime.getBoundingClientRect().left + step + "px";
    //slime.style.left = currentPosition + "px";
    slime.style.left = currentPosition + "%";
});

connection.on("GameOver", function (rank)
{
    document.getElementById("winner").src = "/images/slime/"+rank[0]+".gif";
    document.getElementById("rankBox").style["display"] = "inline";
});

