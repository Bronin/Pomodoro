var breakTimer = 0;
var seshTimer = 0;
var seconds = 0;
var countdown = 0;
var timerMax = 0;

var working = true;
var running = false;

var sessionColor = "#4ECDC4";
var defaultColor = "#FFFF";
var breakColor = "#FF6B6B";

var timeDisplay = document.getElementById("time-display");
var statusDisplay = document.getElementById("status-text");
var progressBar = document.getElementById("progress-container");
var progressFill = document.getElementById("progress-bar");

$(document).ready(function() {
    breakTimer = gettime("break-time");
    seshTimer = gettime("session-time");
    updateTimer(seshTimer, seconds);
    countdown = seshTimer;

    $("#start-timer").click(function() {
        running = !running;
        if (running == true) {
        workingToggle();
        runTimer();
        } else {
        timeDisplay.style.color = defaultColor;
        progressBar.style.borderColor = defaultColor;
        progressFill.style.backgroundColor = defaultColor;
        statusDisplay.innerHTML = "Paused";
        }
    });

    $("button").on("click", function() {
        var buttonVal = $(this).val();
        if (running == false) {
        switch (buttonVal) {
            case "p+":
            seshTimer++;
            break;

            case "p-":
            seshTimer--;
            break;

            case "b+":
            breakTimer++;
            break;

            case "b-":
            breakTimer--;
            break;
        }

        if (seshTimer == 0) {
            seshTimer = 1;
        }
        if (breakTimer == 0) {
            breakTimer = 1;
        }

        settime("session-time", seshTimer);
        settime("break-time", breakTimer);
        if (working == true) {
            countdown = seshTimer;
            seconds = 0;
            updateTimer(seshTimer, seconds);
        } else {
            countdown = breakTimer;
            seconds = 0;
            updateTimer(breakTimer, seconds);
        }
        }
    });
});

function runTimer() {
  var timerID = 0;
  timerID = setInterval(function() {
    if (running == false) {
      clearInterval(timerID);
    } else if (seconds == 0) {
      countdown--;
      seconds = 59;
    } else {
      seconds--;
    }

    if (countdown == 0 && seconds == 0) {
      working = !working;
      countdown = breakTimer;
      workingToggle();
      clearInterval(timerID);
      runTimer();
    }
    
    updateTimer(countdown, seconds);
    updateProgress(countdown, seconds);
  }, 1000);
  return;
}

function workingToggle() {
  if (working == true) {
    timerMax = seshTimer;
    timeDisplay.style.color = sessionColor;
    progressBar.style.borderColor = sessionColor;
    progressFill.style.backgroundColor = sessionColor;
    statusDisplay.innerHTML = "Working";
  } else {
    timerMax = breakTimer;
    timeDisplay.style.color = breakColor;
    progressBar.style.borderColor = breakColor;
    progressFill.style.backgroundColor = breakColor;
    statusDisplay.innerHTML = "Break";
  }
  return;
}

function updateProgress(min, sec) {
  var goal = timerMax * 60;
  var curr = min * 60 + sec;
  var percentage = 100 - curr / goal * 100;
  progressFill.style.width = percentage + "%";
  return;
}

function gettime(timerID) {
  var timer = document.getElementById(timerID).innerHTML;
  return timer;
}

function settime(ID, val) {
  document.getElementById(ID).innerHTML = val;
  return;
}

function updateTimer(min, sec) {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] < 10) {
      arguments[i] = "0" + arguments[i];
    }
  }
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("seconds").innerHTML = sec;
  return;
}
