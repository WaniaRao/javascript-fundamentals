
// ===== YOURMATE FITNESS POPUP SYSTEM =====

// Create Popup
var popup = document.createElement("div");

popup.className = "popup-overlay";

popup.innerHTML = `
    <div class="fitness-popup">

        <button class="popup-close">&times;</button>

        <div class="popup-icon">
            <i class="fa-solid fa-dumbbell"></i>
        </div>

        <h2 id="popup-title">Welcome!</h2>

        <p id="popup-message">
            Welcome to YourMate Fitness.
        </p>

        <button class="popup-ok">Let's Go!</button>

    </div>
`;

document.body.appendChild(popup);


// Popup Elements
var popupTitle = document.querySelector("#popup-title");
var popupMessage = document.querySelector("#popup-message");

var closeBtn = document.querySelector(".popup-close");
var okBtn = document.querySelector(".popup-ok");

var nextSection = "";


// Show Popup Function
function showPopup(title, message, icon, section) {

    popupTitle.innerText = title;
    popupMessage.innerText = message;

    document.querySelector(".popup-icon").innerHTML =
        `<i class="${icon}"></i>`;

    nextSection = section || "";

    popup.classList.add("active");
}


// Close Popup Function
function closePopup() {

    popup.classList.remove("active");

    if (nextSection) {
        var target = document.querySelector(nextSection);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        nextSection = "";
    }
}


// Get Started
document.querySelector(".nav-btn").addEventListener("click", function(e) {

    e.preventDefault();

    showPopup(
        "Let's Get Started!",
        "Your fitness journey begins today. Let's make you stronger!",
        "fa-solid fa-bolt",
        "#join"
    );

});


// Explore Programs
document.querySelector(".primary-btn").addEventListener("click", function(e) {

    e.preventDefault();

    showPopup(
        "Explore Programs",
        "Discover workouts designed to help you achieve your fitness goals.",
        "fa-solid fa-dumbbell",
        "#workouts"
    );

});


// Meet Trainers
document.querySelector(".secondary-btn").addEventListener("click", function(e) {

    e.preventDefault();

    showPopup(
        "Meet Our Experts",
        "Our professional trainers are ready to guide your fitness journey.",
        "fa-solid fa-user-group",
        "#trainers"
    );

});


// Explore Plan Buttons
document.querySelectorAll(".goal-link").forEach(function(button) {

    button.addEventListener("click", function(e) {

        e.preventDefault();

        var plan = button.parentElement.querySelector("h3").innerText;

        showPopup(
            plan + " Plan",
            "Great choice! Your " + plan + " journey starts here.",
            "fa-solid fa-bullseye",
            "#workouts"
        );

    });

});


// Workout Buttons
document.querySelectorAll(".workout-btn").forEach(function(button) {

    button.addEventListener("click", function(e) {

        e.preventDefault();

        var card = button.closest(".workout-card");
        var name = card.querySelector("h3").innerText;

        showPopup(
            "Ready to Train?",
            "You selected " + name + ". Get ready for your workout!",
            "fa-solid fa-fire",
            ""
        );

    });

});


// Join YourMate
document.querySelector(".join-btn").addEventListener("click", function(e) {

    e.preventDefault();

    showPopup(
        "Welcome to YourMate!",
        "Thank you for choosing us. Your stronger future starts now!",
        "fa-solid fa-heart",
        "#fitness"
    );

});


// Close Buttons
closeBtn.addEventListener("click", closePopup);
okBtn.addEventListener("click", closePopup);


// Click Outside Popup
popup.addEventListener("click", function(e) {

    if (e.target === popup) {
        closePopup();
    }

});


// Escape Key
document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        closePopup();
    }

});

// HERO IMAGE SLIDER

var hero = document.querySelector(".hero-image");

var originalImage = hero.querySelector("img");

var imageList = [
    "./hero.jpg",
    "images/fitness1.jpg",
    "images/fitness2.jpg",
    "images/fitness3.jpg",
    "images/fitness4.jpg",
    "images/fitness5.jpg",
    "images/fitness6.jpg",
    "images/fitness7.jpg",
    "./hero.jpg"
];

// Create Image Track
var track = document.createElement("div");

track.className = "hero-hover-track";

imageList.forEach(function(src) {

    var img = document.createElement("img");

    img.src = src;
    img.alt = "Fitness Training";

    track.appendChild(img);

});

hero.appendChild(track);


// Slider Settings
var currentImage = 0;
var sliderInterval;


// Start Slider on Hover
hero.addEventListener("mouseenter", function() {

    clearInterval(sliderInterval);

    track.style.transition = "none";
    track.style.transform = "translateY(0)";

    currentImage = 0;

    setTimeout(function() {

        track.style.transition = "transform 0.7s ease-in-out";

        sliderInterval = setInterval(function() {

            currentImage++;

            track.style.transform =
                "translateY(-" + (currentImage * 100) + "%)";

            if (currentImage === imageList.length - 1) {

                setTimeout(function() {

                    track.style.transition = "none";
                    track.style.transform = "translateY(0)";
                    currentImage = 0;

                }, 750);

            }

        }, 1600);

    }, 50);

});


// Stop Slider on Mouse Leave
hero.addEventListener("mouseleave", function() {

    clearInterval(sliderInterval);

    currentImage = 0;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateY(0)";

    track.style.opacity = "0";

});


// =========================
// DARK / LIGHT MODE
// =========================

var themeToggle = document.getElementById("themeToggle");

var themeIcon = themeToggle.querySelector("i");
var themeText = themeToggle.querySelector("span");

// Check Saved Theme

if (localStorage.getItem("websiteTheme") === "dark") {

    document.body.classList.add("dark-mode");

    themeIcon.className = "fa-solid fa-sun";
    themeText.innerText = "Light Mode";

}

// Toggle Theme

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeIcon.className = "fa-solid fa-sun";
        themeText.innerText = "Light Mode";

        localStorage.setItem("websiteTheme", "dark");

    } else {

        themeIcon.className = "fa-solid fa-moon";
        themeText.innerText = "Dark Mode";

        localStorage.setItem("websiteTheme", "light");

    }

});
