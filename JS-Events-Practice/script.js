
/* ==================================
   QUESTION 1: BACKGROUND COLOR
================================== */

function changeBackground(color, name) {
    document.body.style.backgroundColor = color;

    document.getElementById("colorName").innerHTML = name;
}

function resetBackground() {
    document.body.style.backgroundColor = "#f3f2fc";

    document.getElementById("colorName").innerHTML = "Default";
}


/* ==================================
   QUESTION 2: DOUBLE CLICK
================================== */

var clicks = 0;

function changeMessage() {
    clicks++;

    document.getElementById("message").innerHTML =
        "Great! You double-clicked me!";

    document.getElementById("clickCount").innerHTML = clicks;
}

function resetMessage() {
    clicks = 0;

    document.getElementById("message").innerHTML =
        "Double-click me!";

    document.getElementById("clickCount").innerHTML = clicks;
}


/* ==================================
   QUESTION 3: MOUSEOVER AND MOUSEOUT
================================== */

function changeHeading() {
    var heading = document.getElementById("hoverHeading");
    var status = document.getElementById("hoverStatus");

    heading.style.color = "red";
    heading.style.fontSize = "30px";
    heading.innerHTML = "Mouse is Over Me!";

    status.innerHTML = "Status: Mouse is over the heading";
}

function resetHeading() {
    var heading = document.getElementById("hoverHeading");
    var status = document.getElementById("hoverStatus");

    heading.style.color = "blue";
    heading.style.fontSize = "23px";
    heading.innerHTML = "Move Your Mouse Here";

    status.innerHTML = "Status: Waiting for mouse";
}


/* ==================================
   QUESTION 4: LIVE NAME GREETING
================================== */

function showText() {
    var name = document.getElementById("userInput").value;

    document.getElementById("charCount").innerHTML = name.length;

    if (name.trim() === "") {
        document.getElementById("greeting").innerHTML =
            "Hello, Guest!";

        document.getElementById("output").innerHTML =
            "Your name will appear here.";
    } else {
        document.getElementById("greeting").innerHTML =
            "Hello, " + name.trim() + "!";

        document.getElementById("output").innerHTML =
            "Welcome to JavaScript Events Practice, " + name.trim() + ".";
    }
}

function clearInput() {
    document.getElementById("userInput").value = "";

    document.getElementById("charCount").innerHTML = "0";

    document.getElementById("greeting").innerHTML =
        "Hello, Guest!";

    document.getElementById("output").innerHTML =
        "Your name will appear here.";
}


/* ==================================
   QUESTION 5: SHOW AND HIDE PARAGRAPH
================================== */

function toggleParagraph() {
    var paragraph = document.getElementById("myParagraph");
    var button = document.getElementById("toggleBtn");
    var status = document.getElementById("visibilityStatus");

    if (paragraph.style.display === "none") {
        paragraph.style.display = "block";

        button.innerHTML = "Hide Paragraph";
        status.innerHTML = "Visible";
    } else {
        paragraph.style.display = "none";

        button.innerHTML = "Show Paragraph";
        status.innerHTML = "Hidden";
    }
}
