
  function Map(width, height) {
    this.width = width;
    this.height = height;

    this.image = null;
  }

  Map.prototype.generate = function() {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    var rows = ~~(this.width / 44) + 1;
    var columns = ~~(this.height / 44) + 1;

    var color = "red";
    ctx.save();
    ctx.fillStyle = "red";
    for (var x = 0, i = 0; i < rows; x += 44, i++) {
      ctx.beginPath();
      for (var y = 0, j = 0; j < columns; y += 44, j++) {
        ctx.rect(x, y, 40, 40);
      }
      color = color == "red" ? "white" : "white";
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();

    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    ctx = null;
  };

  Map.prototype.draw = function(context, xView, yView) {
    
    var sx, sy, dx, dy;
    var sWidth, sHeight, dWidth, dHeight;

    sx = xView;
    sy = yView;

    sWidth = context.canvas.width;
    sHeight = context.canvas.height;

    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width - sx;
    }
    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    dx = 0;
    dy = 0;

    dWidth = sWidth;
    dHeight = sHeight;

    context.drawImage(
      this.image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  };
  
  module.exports = Map;

