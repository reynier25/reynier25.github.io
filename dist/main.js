/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/camera.js":
/*!***********************!*\
  !*** ./src/camera.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Rectangle = __webpack_require__(/*! ./rectangle */ \"./src/rectangle.js\");\n\n  var AXIS = {\n    NONE: 1,\n    HORIZONTAL: 2,\n    VERTICAL: 3,\n    BOTH: 4\n  };\n\n\n  function Camera(\n    xView,\n    yView,\n    viewportWidth,\n    viewportHeight,\n    worldWidth,\n    worldHeight\n  ) {\n\n    this.xView = xView || 0;\n    this.yView = yView || 0;\n\n    this.xDeadZone = 0;\n    this.yDeadZone = 0;\n\n    this.wView = viewportWidth;\n    this.hView = viewportHeight;\n\n    this.axis = AXIS.BOTH;\n\n    this.followed = null;\n\n    this.viewportRect = new Rectangle(\n      this.xView,\n      this.yView,\n      this.wView,\n      this.hView\n    );\n\n    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);\n  }\n\n\n  Camera.prototype.follow = function(gameObject, xDeadZone, yDeadZone) {\n    this.followed = gameObject;\n    this.xDeadZone = xDeadZone;\n    this.yDeadZone = yDeadZone;\n  };\n\n  Camera.prototype.update = function() {\n    if (this.followed != null) {\n      if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {\n\n        if (this.followed.x - this.xView + this.xDeadZone > this.wView)\n          this.xView = this.followed.x - (this.wView - this.xDeadZone);\n        else if (this.followed.x - this.xDeadZone < this.xView)\n          this.xView = this.followed.x - this.xDeadZone;\n      }\n      if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {\n\n        if (this.followed.y - this.yView + this.yDeadZone > this.hView)\n          this.yView = this.followed.y - (this.hView - this.yDeadZone);\n        else if (this.followed.y - this.yDeadZone < this.yView)\n          this.yView = this.followed.y - this.yDeadZone;\n      }\n    }\n\n    this.viewportRect.set(this.xView, this.yView);\n\n    if (!this.viewportRect.within(this.worldRect)) {\n      if (this.viewportRect.left < this.worldRect.left)\n        this.xView = this.worldRect.left;\n      if (this.viewportRect.top < this.worldRect.top)\n        this.yView = this.worldRect.top;\n      if (this.viewportRect.right > this.worldRect.right)\n        this.xView = this.worldRect.right - this.wView;\n      if (this.viewportRect.bottom > this.worldRect.bottom)\n        this.yView = this.worldRect.bottom - this.hView;\n    }\n  };\n\n  module.exports = Camera;\n\n\n\n//# sourceURL=webpack:///./src/camera.js?");

/***/ }),

/***/ "./src/food.js":
/*!*********************!*\
  !*** ./src/food.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Food(x, y) {\n  this.x = x;\n  this.y = y;\n  this.radius = 5;\n}\n\nFood.prototype.draw = function(context, xView, yView) {\n    context.save();\n    context.fillStyle = \"red\";\n\n    context.beginPath();\n    context.arc(\n      this.x - this.radius / 2 - xView,\n      this.y - this.radius / 2 - yView,\n      this.radius,\n      0,\n      2 * Math.PI,\n      true\n    );\n    context.fill();\n    context.restore();\n};\n\nFood.prototype.isCollidedWith = function isCollidedWith(player) {\n  const pos1 = [this.x, this.y];\n  const pos2 = [player.x - player.radius / 2 + 3, player.y - player.radius / 2 + 3]; //handles small collision bug\n  const centerDist = Util.dist(pos1, pos2);\n  debugger;\n  return centerDist < this.radius + player.radius;\n};\n\nmodule.exports = Food;\n\n\n//# sourceURL=webpack:///./src/food.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Game Script\nconst Map = __webpack_require__(/*! ./map */ \"./src/map.js\");\nconst Camera = __webpack_require__(/*! ./camera */ \"./src/camera.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Food = __webpack_require__(/*! ./food */ \"./src/food.js\");\nconst Timer = __webpack_require__(/*! ./timer */ \"./src/timer.js\");\n\nfunction randomColor() {\n  const hexDigits = \"0123456789ABCDEF\";\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor(Math.random() * 16)];\n  }\n\n  return color;\n}\n\nvar randomccc = randomColor();\n\nfunction Game(canvas, context) {\n\n  var FPS = 30;\n  var INTERVAL = 1000 / FPS;\n  var STEP = INTERVAL / 1000;\n\n  var room = {\n    width: 4000,\n    height: 2800,\n    map: new Map(4000, 2800)\n  };\n\n  room.map.generate();\n\n  // setup player\n  var player = new Player(canvas.width / 2, canvas.height / 2);\n  var vWidth = Math.min(room.width, canvas.width);\n  var vHeight = Math.min(room.height, canvas.height);\n\n  var camera = new Camera(0, 0, vWidth, vHeight, room.width, room.height);\n  camera.follow(player, vWidth / 2, vHeight / 2);\n\n  var timer = new Timer();\n\n  var update = function() {\n    player.update(STEP, room.width, room.height);\n    camera.update();\n  };\n    \n  var foods = [new Food(0, 0)];\n  for (let i = 0; i < 400; i++) {\n    randX = Math.random() * 4500\n    randY = Math.random() * 4300\n    foods.push(new Food(randX, randY))\n  }\n\n  var randomColor = function() {\n    const hexDigits = \"0123456789ABCDEF\";\n\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n      color += hexDigits[Math.floor(Math.random() * 16)];\n    }\n\n    return color;\n  };\n\n  var draw = function () {\n\n     context.clearRect(0, 0, canvas.width, canvas.height);\n    context.fillStyle = randomccc;                          // canvas color;\n\n    const timerText = document.getElementById(\"timer\");\n    if ((timerText.innerText === \"you win!\")) {\n      context.fillStyle = randomColor();\n    } else {\n      context.fillStyle = randomccc;\n    }\n\n\n    context.fillRect(0, 0, canvas.width, canvas.height);\n\n      player.draw(context, camera.xView, camera.yView);\n      \n      foods.forEach((food, idx) => {\n        food.draw(context, camera.xView, camera.yView);\n        debugger;\n        let isCollided = food.isCollidedWith(player);\n        if (isCollided) {\n\n          foods.splice(idx, 1);\n          player.radius += food.radius;\n        }\n\n        if (player.radius >= 200) {\n\n          player.radius /= 2;\n          player.x /= 2;\n          player.y /= 2;\n          player.speed /= 3;\n\n          room.map.width /= 2;\n          room.map.height /= 2;\n          room.width /= 2;\n          room.height /= 2;\n\n          foods.forEach((food) => {\n            food.x /= 2;\n            food.y /= 2;\n            food.radius /= 2;\n          })\n\n          // vWidth /= 2;\n          // vHeight /= 2;\n\n        }\n      });\n  };\n  \n        const timerbutton = document.getElementById(\"start-button\");\n        timerbutton.addEventListener(\"click\", () => {\n          timer.startTime()\n        });\n        \n  var gameLoop = function() {\n    update();\n    draw();\n\n    // const timerbutton = document.getElementById(\"start-button\");\n    // timerbutton.addEventListener(\"click\", timer.startTime());\n\n    if (timer.ticking) {\n      timer.tick();\n      const timerText = document.getElementById(\"timer\");\n      timerText.innerText = `${timer.currentTime}`;\n    }\n\n\n    if (foods.length < 350) {\n      const timerText = document.getElementById(\"timer\");\n      timerText.innerText = \"you win!\";\n      // this.togglePause();\n    }\n\n    if (timer.time === 0) {\n      const timerText = document.getElementById(\"timer\");\n      timerText.innerText = \"you lose!\";\n      // this.togglePause();\n    }\n  };\n\n  var runningId = -1;\n\n  Game.prototype.play = function() {\n    if (runningId == -1) {\n        runningId = setInterval(function () {\n            // debugger;\n            // console.log(\"hello\");\n        gameLoop();\n      }, INTERVAL);\n      console.log(\"play\");\n    }\n  };\n\n  Game.prototype.resize = function () {\n          player.radius /= 2;\n          player.x /= 2;\n          player.y /= 2;\n          player.speed /= 2;\n\n          room.map.width /= 2;\n          room.map.height /= 2;\n        \n          food.x /= 2;\n          food.y /= 2;\n  }\n\n  Game.prototype.togglePause = function() {\n    if (runningId == -1) {\n      Game.play();\n    } else {\n      clearInterval(runningId);\n      runningId = -1;\n      console.log(\"paused\");\n    }\n  };\n\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ \"./src/timer.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_timer__WEBPACK_IMPORTED_MODULE_0__);\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementsByTagName(\"canvas\")[0];\n\n    canvas.width = 1000;\n    canvas.height = 700;\n    const context = canvas.getContext(\"2d\");\n\n    \n    let game = new Game(canvas, context);\n    game.play(); \n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n  function Map(width, height) {\n    this.width = width;\n    this.height = height;\n\n    this.image = null;\n  }\n\n  Map.prototype.generate = function() {\n    var ctx = document.createElement(\"canvas\").getContext(\"2d\");\n    ctx.canvas.width = this.width;\n    ctx.canvas.height = this.height;\n\n    var rows = ~~(this.width / 44) + 1;\n    var columns = ~~(this.height / 44) + 1;\n\n    var color = \"red\";\n    ctx.save();\n    ctx.fillStyle = \"red\";\n    for (var x = 0, i = 0; i < rows; x += 44, i++) {\n      ctx.beginPath();\n      for (var y = 0, j = 0; j < columns; y += 44, j++) {\n        ctx.rect(x, y, 40, 40);\n      }\n      color = color == \"red\" ? \"white\" : \"white\";\n      ctx.fillStyle = color;\n      ctx.fill();\n      ctx.closePath();\n    }\n    ctx.restore();\n\n    this.image = new Image();\n    this.image.src = ctx.canvas.toDataURL(\"image/png\");\n\n    ctx = null;\n  };\n\n  Map.prototype.draw = function(context, xView, yView) {\n    \n    var sx, sy, dx, dy;\n    var sWidth, sHeight, dWidth, dHeight;\n\n    sx = xView;\n    sy = yView;\n\n    sWidth = context.canvas.width;\n    sHeight = context.canvas.height;\n\n    if (this.image.width - sx < sWidth) {\n      sWidth = this.image.width - sx;\n    }\n    if (this.image.height - sy < sHeight) {\n      sHeight = this.image.height - sy;\n    }\n\n    dx = 0;\n    dy = 0;\n\n    dWidth = sWidth;\n    dHeight = sHeight;\n\n    context.drawImage(\n      this.image,\n      sx,\n      sy,\n      sWidth,\n      sHeight,\n      dx,\n      dy,\n      dWidth,\n      dHeight\n    );\n  };\n  \n  module.exports = Map;\n\n\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction randomColor() {\n  const hexDigits = \"0123456789ABCDEF\";\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor(Math.random() * 16)];\n  }\n\n  return color;\n}  \n\nfunction Player(x, y) {\n\n    this.x = x;\n    this.y = y;\n    this.color = randomColor();\n    this.speed = 200;\n    this.radius = 49;\n  }\n\n    Gamecontrols = {\n      left: false,\n      up: false,\n      right: false,\n      down: false\n    };\n\n    \n\n  Player.prototype.update = function(step, worldWidth, worldHeight) {\n      \n  document.addEventListener(\n  \"keydown\",\n  function(e) {\n    switch (e.keyCode) {\n        case 37: // left arrow\n            // debugger;\n        Gamecontrols.left = true;\n        break;\n      case 38: // up arrow\n        Gamecontrols.up = true;\n        break;\n      case 39: // right arrow\n        Gamecontrols.right = true;\n        // debugger;\n        break;\n      case 40: // down arrow\n        Gamecontrols.down = true;\n        break;\n    }\n  },\n  false\n  );\n      \n\ndocument.addEventListener(\n  \"keyup\",\n  function(e) {\n    switch (e.keyCode) {\n      case 37: // left arrow\n        Gamecontrols.left = false;\n        break;\n      case 38: // up arrow\n        Gamecontrols.up = false;\n        break;\n      case 39: // right arrow\n        Gamecontrols.right = false;\n        break;\n      case 40: // down arrow\n        Gamecontrols.down = false;\n        break;\n      case 80: // key P pauses the game\n        Game.togglePause();\n        break;\n    }\n  },\n  false\n);\n\n    if (Gamecontrols.left) this.x -= this.speed * step;\n    if (Gamecontrols.up) this.y -= this.speed * step;\n      if (Gamecontrols.right) {\n          console.log(\"something\");\n          this.x += this.speed * step;\n      }\n    if (Gamecontrols.down) this.y += this.speed * step;\n\n\n    if (this.x - this.radius / 2 < 0) {\n      this.x = this.radius / 2;\n    }\n    if (this.y - this.radius / 2 < 0) {\n      this.y = this.radius / 2;\n    }\n    if (this.x + this.radius / 2 > worldWidth) {\n      this.x = worldWidth - this.radius / 2;\n    }\n    if (this.y + this.radius / 2 > worldHeight) {\n      this.y = worldHeight - this.radius / 2;\n    }\n  };\n\n  Player.prototype.draw = function(context, xView, yView) {\n    context.save();\n    context.fillStyle = this.color;\n\n    context.beginPath();\n    context.arc(\n      this.x - this.radius / 2 - xView,\n      this.y - this.radius / 2 - yView,\n      this.radius,\n      0,\n      2 * Math.PI,\n      true\n    );\n\n    context.fill();\n\n    context.fillStyle = \"black\";\n    context.fillText(\n      \"YOU\",\n      this.x - this.radius / 2 - xView -10,\n      this.y - this.radius / 2 - yView\n    );\n\n    context.restore();\n\n  };\n\n  module.exports = Player;\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/rectangle.js":
/*!**************************!*\
  !*** ./src/rectangle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n  function Rectangle(left, top, width, height) {\n    this.left = left || 0;\n    this.top = top || 0;\n    this.width = width || 0;\n    this.height = height || 0;\n    this.right = this.left + this.width;\n    this.bottom = this.top + this.height;\n  }\n\n  Rectangle.prototype.set = function(\n    left,\n    top,\n    width,\n    height\n  ) {\n    this.left = left;\n    this.top = top;\n    this.width = width || this.width;\n    this.height = height || this.height;\n    this.right = this.left + this.width;\n    this.bottom = this.top + this.height;\n  };\n\n  Rectangle.prototype.within = function(r) {\n    return (\n      r.left <= this.left &&\n      r.right >= this.right &&\n      r.top <= this.top &&\n      r.bottom >= this.bottom\n    );\n  };\n\n  Rectangle.prototype.overlaps = function(r) {\n    return (\n      this.left < r.right &&\n      r.left < this.right &&\n      this.top < r.bottom &&\n      r.top < this.bottom\n    );\n  };\n\n  module.exports = Rectangle;\n\n\n//# sourceURL=webpack:///./src/rectangle.js?");

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Timer() {\n  this.time = \"\";\n  this.currentTime = \"\";\n  this.count = 10;\n  this.ticking = false;\n}\n\n\n\nTimer.prototype.startTime = function () {\n    this.time = 80;\n    this.ticking = true;\n}\n\nTimer.prototype.pauseTime = function () {\n    this.ticking = false;\n}\n\n// const timerbutton = document.getElementById(\"start-button\");\n// timerbutton.addEventListener(\"click\", this.startTime());\n\nTimer.prototype.secondsToHms = function(d) {\n  let h = Math.floor(d / 3600);\n  let m = Math.floor((d % 3600) / 60);\n  let s = Math.floor((d % 3600) % 60);\n\n  let hDisplay = h > 0 ? h + (h === 1 ? \" h, \" : \" h, \") : \"\";\n  let mDisplay = m > 0 ? m + (m === 1 ? \" m, \" : \" m, \") : \"\";\n  let sDisplay = s > 0 ? s + \" s\" : \"\";\n  return hDisplay + mDisplay + sDisplay;\n};\n\nTimer.prototype.tick = function () {\n    if (this.time !== 0) {\n    \n        this.count -= 2;\n        if (this.count === 0) {\n            this.time -= 1;\n            this.count = 60;\n        }\n        this.currentTime = this.secondsToHms(this.time);\n    }\n\n};\n\nmodule.exports = Timer;\n\n\n//# sourceURL=webpack:///./src/timer.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });