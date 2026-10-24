
var number = 0;

function increment() {
    number++;
    document.getElementById("count").innerHTML = number;
}

function decrement() {
    number--;
    document.getElementById("count").innerHTML = number;
}

function reset() {
    number = 0;
    document.getElementById("count").innerHTML = number;
}
