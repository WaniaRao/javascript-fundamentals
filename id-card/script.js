
var form = document.getElementById("studentForm");

var card = document.getElementById("idCard");
var flipBtn = document.getElementById("flipBtn");
var cardScene = document.getElementById("cardScene");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get form values
    var name = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    var course = document.getElementById("course").value;
    var institute = document.getElementById("institute").value;
    var phone = document.getElementById("phone").value;
    var photo = document.getElementById("photo").value;

    // Show details on front side
    document.getElementById("cardName").innerText = name;
    document.getElementById("cardRoll").innerText = roll;
    document.getElementById("cardCourse").innerText = course;
    document.getElementById("cardPhone").innerText = phone;
    document.getElementById("frontInstitute").innerText = institute;

    // Show details on back side
    document.getElementById("backInstitute").innerText = institute;
    document.getElementById("backName").innerText = name;
    document.getElementById("backRoll").innerText = roll;

    // Student photo
    var studentPhoto = document.getElementById("studentPhoto");

    if (photo !== "") {
        studentPhoto.src = photo;
    } else {
        studentPhoto.src = "https://placehold.co/150x180/ddd6f3/35245c?text=PHOTO";
    }

    // Reset card to front
    card.classList.remove("flipped");

    // Show card animation
    cardScene.classList.remove("show");
    flipBtn.classList.remove("show");

    void cardScene.offsetWidth;

    cardScene.classList.add("show");

    // Show flip button after card animation
    setTimeout(function() {
        flipBtn.classList.add("show");
    }, 1000);

});

// Flip card button
flipBtn.addEventListener("click", function() {

    card.classList.toggle("flipped");

    if (card.classList.contains("flipped")) {
        flipBtn.innerHTML = "<span>↻</span> Flip to Front";
    } else {
        flipBtn.innerHTML = "<span>↻</span> Flip to Back";
    }

});
