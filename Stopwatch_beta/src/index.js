let total = document.getElementById("total-span");
let lap = document.getElementById("lap-span");
let startBtn = document.getElementById("btn-start");
let resetBtn = document.getElementById("btn-reset");
let lapBtn = document.getElementById("btn-lap");
let lapList = document.getElementById("lap-list");

function Stopwatch(el) {
  var time = 0;
  var offset;
  var interval;
  var laps = [0];

  function watchOnLap() {
    var currentLap = document.createElement("li");
    currentLap.innerText = el.innerText;
    lapList.appendChild(currentLap);

    laps.push(time);
    lap.innerText = getLapTime();
  }

  function watchOffLap() {
    return;
  }

  function getLapTime() {
    for (let i = 0; i < laps.length; i++) {
      let difference = laps[laps.length - 1] - laps[laps.length - 2];
      return formatTime(difference);
    }
  }

  function updateTime() {
    time += intervalDiff();
    el.innerText = formatTime(time);
  }

  function intervalDiff() {
    let now = Date.now();
    let diff = now - offset;
    offset = now;

    return diff;
  }

  function formatTime(time) {
    time = new Date(time);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let ms = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    if (seconds.length < 2) {
      seconds = `0${seconds}`;
    }

    while (ms.length < 3) {
      ms = `0${ms}`;
    }

    let formatedTime = `${minutes}:${seconds}:${ms}`;
    return formatedTime;
  }

  this.start = function () {
    interval = setInterval(updateTime.bind(this), 1);
    offset = Date.now();
    this.isOn = true;
    startBtn.innerText = "STOP";
    startBtn.classList.remove("stoped");
    startBtn.classList.add("started");
    lapBtn.classList.remove("sw-stoped-lap");
  };

  this.stop = function () {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
    startBtn.innerText = "START";
    startBtn.classList.remove("started");
    startBtn.classList.add("stoped");
    lapBtn.classList.add("sw-stoped-lap");
  };

  this.reset = function () {
    time = 0;
    interval = null;
    lapList.innerHTML = "- Laps -";
    lap.innerText = formatTime(time);
    el.innerText = formatTime(time);
    this.isOn = false;
  };

  this.onLap = function () {
    watchOnLap();
  };

  this.offLap = function () {
    watchOffLap();
  };

  this.isOn = false;
}

var watch = new Stopwatch(total);

function watchOnReset() {
  watch.stop();
  watch.reset();
}

startBtn.addEventListener("click", function () {
  watch.isOn ? watch.stop() : watch.start();
});

resetBtn.addEventListener("click", function () {
  watch.isOn ? watchOnReset() : watch.reset();
});

lapBtn.addEventListener("click", function () {
  watch.isOn ? watch.onLap() : watch.offLap();
});
