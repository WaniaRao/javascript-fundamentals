// Getting HTML Elements
var notesGrid = document.getElementById("notesGrid");
var modalOverlay = document.getElementById("modalOverlay");

var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");

var noteForm = document.getElementById("noteForm");
var noteTitle = document.getElementById("noteTitle");
var noteContent = document.getElementById("noteContent");

var searchInput = document.getElementById("searchInput");

var allNotesBtn = document.getElementById("allNotesBtn");
var pinnedNotesBtn = document.getElementById("pinnedNotesBtn");

var allCount = document.getElementById("allCount");
var pinnedCount = document.getElementById("pinnedCount");
var totalText = document.getElementById("totalText");

var pageTitle = document.getElementById("pageTitle");
var sectionTitle = document.getElementById("sectionTitle");
var modalTitle = document.getElementById("modalTitle");
var saveNoteBtn = document.getElementById("saveNoteBtn");


// Notes Array

var notes = JSON.parse(localStorage.getItem("myNotes")) || [];

var editId = null;
var currentPage = "all";


// Save Notes

function saveNotes() {

    localStorage.setItem("myNotes", JSON.stringify(notes));

}


// Open Modal

openModalBtn.addEventListener("click", function() {

    editId = null;

    noteForm.reset();

    modalTitle.textContent = "Create a Note";
    saveNoteBtn.textContent = "Save Note ✿";

    modalOverlay.classList.add("show");

});


// Close Modal

closeModalBtn.addEventListener("click", function() {

    modalOverlay.classList.remove("show");

});


// Close Modal on Outside Click

modalOverlay.addEventListener("click", function(event) {

    if (event.target === modalOverlay) {
        modalOverlay.classList.remove("show");
    }

});


// Add or Update Note

noteForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var title = noteTitle.value.trim();
    var content = noteContent.value.trim();

    var selectedColor = document.querySelector(
        'input[name="noteColor"]:checked'
    ).value;

    if (title === "" || content === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (editId !== null) {

        // Update Existing Note

        for (var i = 0; i < notes.length; i++) {

            if (notes[i].id === editId) {

                notes[i].title = title;
                notes[i].content = content;
                notes[i].color = selectedColor;

            }

        }

    } else {

        // Create New Note

        var newNote = {
            id: Date.now(),
            title: title,
            content: content,
            color: selectedColor,
            pinned: false,
            date: new Date().toISOString()
        };

        notes.push(newNote);

    }

    saveNotes();

    showNotes();

    noteForm.reset();

    modalOverlay.classList.remove("show");

    editId = null;

});


// Show Notes

function showNotes() {

    notesGrid.innerHTML = "";

    var searchValue = searchInput.value.toLowerCase();

    var filteredNotes = [];

    for (var i = 0; i < notes.length; i++) {

        var note = notes[i];

        var matchesSearch =
            note.title.toLowerCase().includes(searchValue) ||
            note.content.toLowerCase().includes(searchValue);

        var matchesPage =
            currentPage === "all" || note.pinned === true;

        if (matchesSearch && matchesPage) {

            filteredNotes.push(note);

        }

    }

    // Pinned notes first

    filteredNotes.sort(function(a, b) {
        return Number(b.pinned) - Number(a.pinned);
    });

    // Empty Message

    if (filteredNotes.length === 0) {

        var empty = document.createElement("div");
        empty.className = "empty-state";

        var flower = document.createElement("div");
        flower.textContent = "✿";

        var heading = document.createElement("h3");
        heading.textContent = searchValue
            ? "No matching notes"
            : currentPage === "pinned"
                ? "No pinned notes yet"
                : "Your space is waiting!";

        var message = document.createElement("p");
        message.textContent = searchValue
            ? "Try searching with another word."
            : currentPage === "pinned"
                ? "Pin a note to find it here."
                : "Create your first note and let your ideas bloom.";

        empty.appendChild(flower);
        empty.appendChild(heading);
        empty.appendChild(message);

        notesGrid.appendChild(empty);

    }

    // Create Note Cards

    for (var i = 0; i < filteredNotes.length; i++) {

        var note = filteredNotes[i];

        var card = document.createElement("div");
        card.className = "note-card " + note.color;

        // Card Top

        var cardTop = document.createElement("div");
        cardTop.className = "note-card-top";

        var category = document.createElement("span");
        category.className = "note-category";
        category.textContent = "MY THOUGHTS";

        var actions = document.createElement("div");
        actions.className = "note-actions";

        // Pin Button

        var pinButton = document.createElement("button");
        pinButton.className = "note-action";
        pinButton.textContent = note.pinned ? "★" : "☆";
        pinButton.title = note.pinned ? "Unpin note" : "Pin note";

        pinButton.addEventListener("click", function(id) {

            return function() {
                pinNote(id);
            };

        }(note.id));

        // Edit Button

        var editButton = document.createElement("button");
        editButton.className = "note-action";
        editButton.textContent = "✎";
        editButton.title = "Edit note";

        editButton.addEventListener("click", function(id) {

            return function() {
                editNote(id);
            };

        }(note.id));

        // Delete Button

        var deleteButton = document.createElement("button");
        deleteButton.className = "note-action";
        deleteButton.textContent = "×";
        deleteButton.title = "Delete note";

        deleteButton.addEventListener("click", function(id) {

            return function() {
                deleteNote(id);
            };

        }(note.id));

        actions.appendChild(pinButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        cardTop.appendChild(category);
        cardTop.appendChild(actions);

        // Note Title

        var heading = document.createElement("h3");
        heading.textContent = note.title;

        // Note Content

        var content = document.createElement("p");
        content.className = "note-content";
        content.textContent = note.content;

        // Date

        var date = document.createElement("p");
        date.className = "note-date";

        var noteDate = new Date(note.date);

        date.textContent = noteDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        // Add Everything to Card

        card.appendChild(cardTop);
        card.appendChild(heading);
        card.appendChild(content);
        card.appendChild(date);

        notesGrid.appendChild(card);

    }

    updateCounts();

}


// Edit Note

function editNote(id) {

    var selectedNote = null;

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id === id) {
            selectedNote = notes[i];
        }

    }

    if (selectedNote === null) {
        return;
    }

    editId = id;

    noteTitle.value = selectedNote.title;
    noteContent.value = selectedNote.content;

    var colorOption = document.querySelector(
        'input[name="noteColor"][value="' + selectedNote.color + '"]'
    );

    if (colorOption) {
        colorOption.checked = true;
    }

    modalTitle.textContent = "Edit Your Note";
    saveNoteBtn.textContent = "Update Note ✿";

    modalOverlay.classList.add("show");

}


// Delete Note

function deleteNote(id) {

    var confirmDelete = confirm("Are you sure you want to delete this note?");

    if (confirmDelete) {

        notes = notes.filter(function(note) {
            return note.id !== id;
        });

        saveNotes();

        showNotes();

    }

}


// Pin and Unpin Note

function pinNote(id) {

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].id === id) {

            notes[i].pinned = !notes[i].pinned;

        }

    }

    saveNotes();

    showNotes();

}


// Update Note Counts

function updateCounts() {

    var pinnedTotal = 0;

    for (var i = 0; i < notes.length; i++) {

        if (notes[i].pinned) {
            pinnedTotal++;
        }

    }

    allCount.textContent = notes.length;
    pinnedCount.textContent = pinnedTotal;

    totalText.textContent = notes.length + " notes saved";

}


// All Notes Button

allNotesBtn.addEventListener("click", function() {

    currentPage = "all";

    allNotesBtn.classList.add("active");
    pinnedNotesBtn.classList.remove("active");

    pageTitle.innerHTML = 'My Notes <span>✿</span>';
    sectionTitle.textContent = "All your thoughts";

    showNotes();

});


// Pinned Notes Button

pinnedNotesBtn.addEventListener("click", function() {

    currentPage = "pinned";

    pinnedNotesBtn.classList.add("active");
    allNotesBtn.classList.remove("active");

    pageTitle.innerHTML = 'Pinned Notes <span>✦</span>';
    sectionTitle.textContent = "Your special notes";

    showNotes();

});


// Search Notes

searchInput.addEventListener("input", function() {

    showNotes();

});


// Initial Display

showNotes();