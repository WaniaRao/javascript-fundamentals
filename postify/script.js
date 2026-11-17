
var postImage = document.getElementById("postImage");
var username = document.getElementById("username");
var locationInput = document.getElementById("location");
var caption = document.getElementById("caption");
var hashtags = document.getElementById("hashtags");
var filter = document.getElementById("filter");

var previewImage = document.getElementById("previewImage");
var placeholder = document.getElementById("placeholder");

var previewUsername = document.getElementById("previewUsername");
var previewName = document.getElementById("previewName");
var previewLocation = document.getElementById("previewLocation");
var previewCaption = document.getElementById("previewCaption");
var previewHashtags = document.getElementById("previewHashtags");
var previewAvatar = document.getElementById("previewAvatar");

var publishedPosts = document.getElementById("publishedPosts");

var successOverlay = document.getElementById("successOverlay");
var deleteOverlay = document.getElementById("deleteOverlay");

var confirmDelete = document.getElementById("confirmDelete");
var cancelDelete = document.getElementById("cancelDelete");

var imageURL = "";
var editingPost = null;
var postToDelete = null;


// LIVE PREVIEW

function updatePreview() {

    var name = username.value.trim() || "Your Name";

    previewUsername.textContent = name;
    previewName.textContent = name;
    previewAvatar.textContent = name.charAt(0).toUpperCase();

    previewLocation.textContent =
        locationInput.value.trim() || "Your location";

    previewCaption.textContent =
        caption.value.trim() || "Your caption will appear here...";

    previewHashtags.textContent =
        hashtags.value.trim() || "#yourhashtags";
}

username.addEventListener("input", updatePreview);
locationInput.addEventListener("input", updatePreview);
caption.addEventListener("input", updatePreview);
hashtags.addEventListener("input", updatePreview);


// IMAGE UPLOAD

postImage.addEventListener("change", function () {

    var file = postImage.files[0];

    if (file) {

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            postImage.value = "";
            return;
        }

        var reader = new FileReader();

        reader.onload = function (event) {

            imageURL = event.target.result;

            previewImage.src = imageURL;
            previewImage.style.display = "block";
            placeholder.style.display = "none";
        };

        reader.readAsDataURL(file);
    }
});


// FILTER

filter.addEventListener("change", function () {
    previewImage.className = filter.value;
});


// RESET FORM

function resetForm() {

    postImage.value = "";
    username.value = "Your Name";
    locationInput.value = "";
    caption.value = "";
    hashtags.value = "";
    filter.value = "none";

    imageURL = "";

    previewImage.src = "";
    previewImage.style.display = "none";
    previewImage.className = "";

    placeholder.style.display = "flex";

    editingPost = null;

    document.getElementById("publishBtn").textContent = "Publish Post ✨";

    updatePreview();
}


// PUBLISH / UPDATE POST

document.getElementById("publishBtn").addEventListener("click", function () {

    if (imageURL === "") {
        alert("Please upload a post image first!");
        return;
    }

    var name = username.value.trim() || "Your Name";
    var postCaption = caption.value.trim();
    var postHashtags = hashtags.value.trim();
    var postLocation = locationInput.value.trim();
    var selectedFilter = filter.value;

    var column;

    if (editingPost) {
        column = editingPost;
        column.innerHTML = "";
    } else {
        column = document.createElement("div");
        column.className = "col-12 col-sm-6 col-lg-3";
    }

    var card = document.createElement("div");
    card.className = "published-card";

    var img = document.createElement("img");
    img.src = imageURL;

    if (selectedFilter !== "none") {
        img.classList.add(selectedFilter);
    }

    var title = document.createElement("h6");
    title.textContent = name;

    var locationText = document.createElement("p");
    locationText.textContent = postLocation;

    var captionText = document.createElement("p");
    captionText.textContent = postCaption;

    var hashtagText = document.createElement("p");
    hashtagText.textContent = postHashtags;


    // EDIT BUTTON

    var editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", function () {

        editingPost = column;

        username.value = title.textContent;
        locationInput.value = locationText.textContent;
        caption.value = captionText.textContent;
        hashtags.value = hashtagText.textContent;

        filter.value = "none";

        for (var i = 0; i < img.classList.length; i++) {

            var className = img.classList[i];

            if (["warm", "grayscale", "bright", "vintage"].includes(className)) {
                filter.value = className;
            }
        }

        imageURL = img.src;

        previewImage.src = imageURL;
        previewImage.style.display = "block";
        placeholder.style.display = "none";

        previewImage.className = filter.value;

        updatePreview();

        document.getElementById("publishBtn").textContent = "Update Post ✨";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // DELETE BUTTON

    var deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {

        postToDelete = column;

        deleteOverlay.classList.add("show");
    });


    // ADD ELEMENTS

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(locationText);
    card.appendChild(captionText);
    card.appendChild(hashtagText);

    var buttons = document.createElement("div");

    buttons.className = "post-buttons";

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    card.appendChild(buttons);

    column.appendChild(card);


    if (!column.parentNode) {
        publishedPosts.prepend(column);
    }


    // RESET AFTER PUBLISH / UPDATE

    resetForm();


    // SUCCESS POPUP

    successOverlay.classList.add("show");

    setTimeout(function () {
        successOverlay.classList.remove("show");
    }, 2500);

});


// CONFIRM DELETE

confirmDelete.addEventListener("click", function () {

    if (postToDelete) {

        postToDelete.remove();

        if (editingPost === postToDelete) {
            resetForm();
        }

        postToDelete = null;
    }

    deleteOverlay.classList.remove("show");
});


// CANCEL DELETE

cancelDelete.addEventListener("click", function () {

    deleteOverlay.classList.remove("show");

    postToDelete = null;
});
