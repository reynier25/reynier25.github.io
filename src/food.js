const Util = require("./util");

function Food(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
}

Food.prototype.draw = function(context, xView, yView) {
    context.save();
    context.fillStyle = "red";

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
    context.restore();
};

Food.prototype.isCollidedWith = function isCollidedWith(player) {
  const pos1 = [this.x, this.y];
  const pos2 = [player.x - player.radius / 2 + 3, player.y - player.radius / 2 + 3]; //handles small collision bug
  const centerDist = Util.dist(pos1, pos2);
  debugger;
  return centerDist < this.radius + player.radius;
};

module.exports = Food;
