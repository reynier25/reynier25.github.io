const Game = require("./game");

import { time, currentTime, tick, startTime } from "./timer";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];

    canvas.width = 1000;
    canvas.height = 700;
    const context = canvas.getContext("2d");

    
    let game = new Game(canvas, context);
    game.play(); 
});