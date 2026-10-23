
/* Q1: Power Function */

function power(a, b) {
    var answer = 1;

    for (var i = 1; i <= b; i++) {
        answer = answer * a;
    }

    return answer;
}

console.log("Q1 Answer:", power(2, 3));

/* Q2: Leap Year */

function leapYear(year) {
    if (year % 400 == 0 ||
        (year % 4 == 0 && year % 100 != 0)) {
        return "Leap Year";
    } else {
        return "Not a Leap Year";
    }
}

console.log("Q2 Answer:", leapYear(2024));

/* Q3: Area of Triangle Using Two Functions */

function calculateS(a, b, c) {
    return (a + b + c) / 2;
}

function triangleArea(a, b, c) {
    var s = calculateS(a, b, c);

    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log("Q3 Area:", triangleArea(3, 4, 5));

/* Q4: Average and Percentage */

function average(a, b, c) {
    return (a + b + c) / 3;
}

function percentage(a, b, c) {
    return ((a + b + c) / 300) * 100;
}

function mainFunction() {
    var a = 80;
    var b = 70;
    var c = 90;

    console.log("Average:", average(a, b, c));
    console.log("Percentage:", percentage(a, b, c) + "%");
}

mainFunction();

/* Q5: Custom indexOf Function */

function myIndexOf(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            return i;
        }
    }

    return -1;
}

console.log("Q5 Position:", myIndexOf("hello", "l"));

/* Q6: Remove Vowels */

function removeVowels(sentence) {
    var result = "";

    for (var i = 0; i < sentence.length; i++) {
        var ch = sentence[i].toLowerCase();

        if (ch != "a" && ch != "e" &&
            ch != "i" && ch != "o" &&
            ch != "u") {
            result = result + sentence[i];
        }
    }

    return result;
}

console.log("Q6 Answer:", removeVowels("Hello World"));

/* Q7: Count Consecutive Vowels Using Switch */

function countVowels(text) {
    var count = 0;

    for (var i = 0; i < text.length - 1; i++) {
        var pair = text[i].toLowerCase() +
                   text[i + 1].toLowerCase();

        switch (pair) {
            case "aa":
            case "ae":
            case "ai":
            case "ao":
            case "au":
            case "ea":
            case "ee":
            case "ei":
            case "eo":
            case "eu":
            case "ia":
            case "ie":
            case "ii":
            case "io":
            case "iu":
            case "oa":
            case "oe":
            case "oi":
            case "oo":
            case "ou":
            case "ua":
            case "ue":
            case "ui":
            case "uo":
            case "uu":
                count++;
                console.log("Pair:", pair);
                break;
        }
    }

    console.log("Q7 Total:", count);
}

countVowels("Pleases read this application and give me gratuity");

/* Q8: Distance Conversion */

function meters(km) {
    console.log("Meters:", km * 1000);
}

function feet(km) {
    console.log("Feet:", km * 3280.84);
}

function inches(km) {
    console.log("Inches:", km * 39370.08);
}

function centimeters(km) {
    console.log("Centimeters:", km * 100000);
}

var distance = 5;

console.log("Q8 Distance:", distance, "km");
meters(distance);
feet(distance);
inches(distance);
centimeters(distance);

/* Q9: Overtime Pay */

function overtime(hours) {
    if (hours > 40) {
        return (hours - 40) * 12;
    } else {
        return 0;
    }
}

console.log("Q9 Overtime Pay:", overtime(45));

/* Q10: Currency Notes */

function currencyNotes(amount) {
    var notes100 = Math.floor(amount / 100);
    amount = amount % 100;

    var notes50 = Math.floor(amount / 50);
    amount = amount % 50;

    var notes10 = Math.floor(amount / 10);

    console.log("100 Notes:", notes100);
    console.log("50 Notes:", notes50);
    console.log("10 Notes:", notes10);
}

console.log("Q10 Currency Notes:");
currencyNotes(380);
