
function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
}  

function Player(x, y) {

    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.speed = 200;
    this.radius = 49;
  }

    Gamecontrols = {
      left: false,
      up: false,
      right: false,
      down: false
    };

    

  Player.prototype.update = function(step, worldWidth, worldHeight) {
      
  document.addEventListener(
  "keydown",
  function(e) {
    switch (e.keyCode) {
        case 37: // left arrow
            // debugger;
        Gamecontrols.left = true;
        break;
      case 38: // up arrow
        Gamecontrols.up = true;
        break;
      case 39: // right arrow
        Gamecontrols.right = true;
        // debugger;
        break;
      case 40: // down arrow
        Gamecontrols.down = true;
        break;
    }
  },
  false
  );
      

document.addEventListener(
  "keyup",
  function(e) {
    switch (e.keyCode) {
      case 37: // left arrow
        Gamecontrols.left = false;
        break;
      case 38: // up arrow
        Gamecontrols.up = false;
        break;
      case 39: // right arrow
        Gamecontrols.right = false;
        break;
      case 40: // down arrow
        Gamecontrols.down = false;
        break;
      case 80: // key P pauses the game
        Game.togglePause();
        break;
    }
  },
  false
);

    if (Gamecontrols.left) this.x -= this.speed * step;
    if (Gamecontrols.up) this.y -= this.speed * step;
      if (Gamecontrols.right) {
          console.log("something");
          this.x += this.speed * step;
      }
    if (Gamecontrols.down) this.y += this.speed * step;


    if (this.x - this.radius / 2 < 0) {
      this.x = this.radius / 2;
    }
    if (this.y - this.radius / 2 < 0) {
      this.y = this.radius / 2;
    }
    if (this.x + this.radius / 2 > worldWidth) {
      this.x = worldWidth - this.radius / 2;
    }
    if (this.y + this.radius / 2 > worldHeight) {
      this.y = worldHeight - this.radius / 2;
    }
  };

  Player.prototype.draw = function(context, xView, yView) {
    context.save();
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(
      this.x - this.radius / 2 - xView,
      this.y - this.radius / 2 - yView,
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    context.fill();

    context.fillStyle = "black";
    context.fillText(
      "YOU",
      this.x - this.radius / 2 - xView -10,
      this.y - this.radius / 2 - yView
    );

    context.restore();

  };

  module.exports = Player;
