
var questions = [

    {
        question: "What is the capital of Pakistan?",
        options: ["Lahore", "Karachi", "Islamabad", "Multan"],
        answer: "Islamabad"
    },

    {
        question: "Which language is used for web styling?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },

    {
        question: "How many days are there in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },

    {
        question: "Which is the largest ocean?",
        options: ["Indian", "Atlantic", "Pacific", "Arctic"],
        answer: "Pacific"
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which animal is known as the King of Jungle?",
        options: ["Tiger", "Elephant", "Lion", "Leopard"],
        answer: "Lion"
    },

    {
        question: "How many colors are there in a rainbow?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },

    {
        question: "Which language runs in a web browser?",
        options: ["C++", "JavaScript", "Python", "PHP"],
        answer: "JavaScript"
    },

    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Saturn", "Jupiter"],
        answer: "Jupiter"
    },

    {
        question: "Which country is famous for the Eiffel Tower?",
        options: ["Italy", "France", "Germany", "Spain"],
        answer: "France"
    },

    {
        question: "How many months are there in a year?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },

    {
        question: "Which device is used to type on a computer?",
        options: ["Mouse", "Monitor", "Keyboard", "Printer"],
        answer: "Keyboard"
    },

    {
        question: "What is the boiling point of water?",
        options: ["50°C", "75°C", "100°C", "150°C"],
        answer: "100°C"
    },

    {
        question: "Which is the fastest land animal?",
        options: ["Lion", "Cheetah", "Horse", "Deer"],
        answer: "Cheetah"
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<p>"],
        answer: "<h1>"
    },

    {
        question: "Which company created JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },

    {
        question: "What is 15 + 25?",
        options: ["30", "35", "40", "45"],
        answer: "40"
    },

    {
        question: "Which part of a plant absorbs water?",
        options: ["Leaves", "Flower", "Roots", "Stem"],
        answer: "Roots"
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "<!--", "**"],
        answer: "//"
    }

];

var currentQuestion = 0;
var score = 0;
var userAnswers = [];

var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var questionNumber = document.getElementById("questionNumber");
var scoreElement = document.getElementById("score");
var progress = document.getElementById("progress");

var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");

function showQuestion() {

    var current = questions[currentQuestion];

    questionElement.innerText = current.question;

    questionNumber.innerText =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    scoreElement.innerText = "Score: " + score;

    progress.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    optionsElement.innerHTML = "";

    for (var i = 0; i < current.options.length; i++) {

        var button = document.createElement("button");

        button.innerText = current.options[i];

        button.classList.add("option");

        button.onclick = function() {
            selectAnswer(this);
        };

        optionsElement.appendChild(button);

    }

    previousBtn.disabled = currentQuestion === 0;

    nextBtn.innerText =
        currentQuestion === questions.length - 1
        ? "Finish Quiz"
        : "Next Question";

    if (userAnswers[currentQuestion]) {
        showSavedAnswer();
    }

}

function selectAnswer(selectedButton) {

    var answer = selectedButton.innerText;

    userAnswers[currentQuestion] = answer;

    var buttons = optionsElement.children;

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].disabled = true;

        if (buttons[i].innerText === questions[currentQuestion].answer) {
            buttons[i].classList.add("correct");
        }

        if (buttons[i] === selectedButton &&
            answer !== questions[currentQuestion].answer) {
            buttons[i].classList.add("wrong");
        }

    }

    calculateScore();

}

function showSavedAnswer() {

    var buttons = optionsElement.children;
    var savedAnswer = userAnswers[currentQuestion];

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].disabled = true;

        if (buttons[i].innerText === questions[currentQuestion].answer) {
            buttons[i].classList.add("correct");
        }

        if (buttons[i].innerText === savedAnswer &&
            savedAnswer !== questions[currentQuestion].answer) {
            buttons[i].classList.add("wrong");
        }

    }

}

function calculateScore() {

    score = 0;

    for (var i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].answer) {
            score++;
        }

    }

    scoreElement.innerText = "Score: " + score;

}

function nextQuestion() {

    if (!userAnswers[currentQuestion]) {
        alert("Please select an answer first!");
        return;
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

}

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}

function showResult() {

    document.getElementById("quizBox").style.display = "none";

    document.getElementById("resultBox").style.display = "block";

    document.getElementById("finalScore").innerText =
        score + " / " + questions.length;

    var message = "";

    if (score >= 16) {
        message = "Excellent! You are a Quiz Champion! 🌟";
    }

    else if (score >= 10) {
        message = "Good Job! Keep Learning! 👏";
    }

    else {
        message = "Keep Practicing! You can do better! 💜";
    }

    document.getElementById("resultMessage").innerText = message;

}

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    userAnswers = [];

    document.getElementById("quizBox").style.display = "block";

    document.getElementById("resultBox").style.display = "none";

    showQuestion();

}

showQuestion();
