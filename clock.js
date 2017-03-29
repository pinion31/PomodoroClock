$(function(){

    var minutes = 1;
    var seconds = 0;

    var sessionLength = 1;
    var breakLength = 1;

    var clockRunning = false;
    var timer;

    var timeMode = "session";

    updateSession();
    updateBreak();
    updateTime();

    $("#breakAdd").bind("click", addBreakTime);
    $("#breakMinus").click(subtractBreakTime);

    $("#sessionAdd").bind("click", addSessionTime);
    $("#sessionMinus").click(subtractSessionTime);

    $("#time").click(toggleClock);

    function addSessionTime() {
        sessionLength += 1;
        updateClockWithNewSessionTime();
        updateTime();
        updateSession();
    }

    function updateClockWithNewSessionTime() {
        seconds = 0;
        minutes = sessionLength;
    }

    function updateClockWithNewBreakTime() {
        seconds = 0;
        minutes = breakLength;
    }

    function toggleClock() {
        if (!clockRunning) {
            timer = setInterval(startClock, 1000);
            clockRunning = true;
        }
        else {
            stopClock();
            clockRunning = false;
        }
    }

    function toggleTimeMode() {

        if (timeMode == "session") {
            timeMode = "break";
            updateClockWithNewBreakTime();
            alert("Time for a break!");
            updateTime();
            toggleTimeDisplayCSSChange();


        }
        else if (timeMode == "break") {
            timeMode = "session";
            updateClockWithNewSessionTime();
            alert("Break is over!");
            updateTime();
            toggleTimeDisplayCSSChange();
        }

        toggleClock();
    }

    //changes display to show what mode user is in - break or session
    function toggleTimeDisplayCSSChange() {

        $("#sessionDisplay").toggleClass("buttonOn");
        $("#breakDisplay").toggleClass("buttonOn");
        $("#sessionDisplay").toggleClass("buttonOff");
        $("#breakDisplay").toggleClass("buttonOff");

     }

    function checkTimeOver() {

        if (minutes === 0 && seconds === 0) {
            toggleClock();
            toggleTimeMode();

        }
    }

    function startClock() {
        if (seconds === 0) {
            seconds = 59;
            minutes -= 1;
        }
        else {
            seconds -= 1;
        }
        updateTime();
    }

    function stopClock() {
        clearInterval(timer);
    }

    function subtractSessionTime() {
        if (sessionLength  > 1) {
            sessionLength -= 1;
            updateSession();
            updateClockWithNewSessionTime();
            updateTime();
        }
        else {
            alert("Sessions should be more than one minute!");
        }
    }

    function updateTime() {
        $("#minutes").text(minutes);
        $("#seconds").text(convertNumberLessThanTen(seconds));
        checkTimeOver();
    }

    function addBreakTime() {
        breakLength += 1;
        //console.log(breakLength);
        updateBreak();
    }

    function subtractBreakTime() {
        if (breakLength > 1) {
            breakLength -= 1;
            updateBreak();
        }
        else {
            alert("Breaks should be more than one minute!");
        }

    }

    function updateSession() {
        $("#session").text(sessionLength);
    }

    function updateBreak() {
        $("#break").text(breakLength);
       // console.log("hit");
    }

    function convertNumberLessThanTen(number) {
        if (number < 10) {
            return "0" + number;
        }
        else {
            return number;
        }
    }














});