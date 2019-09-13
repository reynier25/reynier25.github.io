// Game Script
const Map = require("./map");
const Camera = require("./camera");
const Player = require("./player");
const Food = require("./food");
const Timer = require("./timer");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
}

var randomccc = randomColor();

function Game(canvas, context) {

  var FPS = 30;
  var INTERVAL = 1000 / FPS;
  var STEP = INTERVAL / 1000;

  var room = {
    width: 4000,
    height: 2800,
    map: new Map(4000, 2800)
  };

  room.map.generate();

  // setup player
  var player = new Player(canvas.width / 2, canvas.height / 2);
  var vWidth = Math.min(room.width, canvas.width);
  var vHeight = Math.min(room.height, canvas.height);

  var camera = new Camera(0, 0, vWidth, vHeight, room.width, room.height);
  camera.follow(player, vWidth / 2, vHeight / 2);

  var timer = new Timer();

  var update = function() {
    player.update(STEP, room.width, room.height);
    camera.update();
  };
    
  var foods = [new Food(0, 0)];
  for (let i = 0; i < 400; i++) {
    randX = Math.random() * 4500
    randY = Math.random() * 4300
    foods.push(new Food(randX, randY))
  }

  var randomColor = function() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  var draw = function () {

     context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = randomccc;                          // canvas color;

    const timerText = document.getElementById("timer");
    if ((timerText.innerText === "you win!")) {
      context.fillStyle = randomColor();
    } else {
      context.fillStyle = randomccc;
    }


    context.fillRect(0, 0, canvas.width, canvas.height);

      player.draw(context, camera.xView, camera.yView);
      
      foods.forEach((food, idx) => {
        food.draw(context, camera.xView, camera.yView);
        debugger;
        let isCollided = food.isCollidedWith(player);
        if (isCollided) {

          foods.splice(idx, 1);
          player.radius += food.radius;
        }

        if (player.radius >= 200) {

          player.radius /= 2;
          player.x /= 2;
          player.y /= 2;
          player.speed /= 3;

          room.map.width /= 2;
          room.map.height /= 2;
          room.width /= 2;
          room.height /= 2;

          foods.forEach((food) => {
            food.x /= 2;
            food.y /= 2;
            food.radius /= 2;
          })

          // vWidth /= 2;
          // vHeight /= 2;

        }
      });
  };
  
        const timerbutton = document.getElementById("start-button");
        timerbutton.addEventListener("click", () => {
          timer.startTime()
        });
        
  var gameLoop = function() {
    update();
    draw();

    // const timerbutton = document.getElementById("start-button");
    // timerbutton.addEventListener("click", timer.startTime());

    if (timer.ticking) {
      timer.tick();
      const timerText = document.getElementById("timer");
      timerText.innerText = `${timer.currentTime}`;
    }


    if (foods.length < 350) {
      const timerText = document.getElementById("timer");
      timerText.innerText = "you win!";
      // this.togglePause();
    }

    if (timer.time === 0) {
      const timerText = document.getElementById("timer");
      timerText.innerText = "you lose!";
      // this.togglePause();
    }
  };

  var runningId = -1;

  Game.prototype.play = function() {
    if (runningId == -1) {
        runningId = setInterval(function () {
            // debugger;
            // console.log("hello");
        gameLoop();
      }, INTERVAL);
      console.log("play");
    }
  };

  Game.prototype.resize = function () {
          player.radius /= 2;
          player.x /= 2;
          player.y /= 2;
          player.speed /= 2;

          room.map.width /= 2;
          room.map.height /= 2;
        
          food.x /= 2;
          food.y /= 2;
  }

  Game.prototype.togglePause = function() {
    if (runningId == -1) {
      Game.play();
    } else {
      clearInterval(runningId);
      runningId = -1;
      console.log("paused");
    }
  };

};

module.exports = Game;