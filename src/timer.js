function Timer() {
  this.time = "";
  this.currentTime = "";
  this.count = 10;
  this.ticking = false;
}



Timer.prototype.startTime = function () {
    this.time = 80;
    this.ticking = true;
}

Timer.prototype.pauseTime = function () {
    this.ticking = false;
}

// const timerbutton = document.getElementById("start-button");
// timerbutton.addEventListener("click", this.startTime());

Timer.prototype.secondsToHms = function(d) {
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h === 1 ? " h, " : " h, ") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " m, " : " m, ") : "";
  let sDisplay = s > 0 ? s + " s" : "";
  return hDisplay + mDisplay + sDisplay;
};

Timer.prototype.tick = function () {
    if (this.time !== 0) {
    
        this.count -= 2;
        if (this.count === 0) {
            this.time -= 1;
            this.count = 60;
        }
        this.currentTime = this.secondsToHms(this.time);
    }

};

module.exports = Timer;
