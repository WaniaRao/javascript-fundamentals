// =====================================
// TASK 1: SIGNUP FORM
// =====================================

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let phone = document.getElementById("signupPhone").value;

    let signupOutput = document.getElementById("signupOutput");
    let signupDetails = document.getElementById("signupDetails");

    signupDetails.innerHTML = "";

    let details = [
        ["Name", name],
        ["Email", email],
        ["Password", "••••••••"],
        ["Phone", phone]
    ];

    details.forEach(function(item) {
        let paragraph = document.createElement("p");
        let strong = document.createElement("strong");

        strong.textContent = item[0] + ": ";

        paragraph.appendChild(strong);
        paragraph.appendChild(document.createTextNode(item[1]));

        signupDetails.appendChild(paragraph);
    });

    signupOutput.classList.remove("hidden");

    signupForm.reset();
});


// =====================================
// TASK 2: READ MORE BUTTON
// =====================================

const readMoreBtn = document.getElementById("readMoreBtn");
const extraText = document.getElementById("extraText");

readMoreBtn.addEventListener("click", function() {

    if (extraText.classList.contains("hidden")) {

        extraText.classList.remove("hidden");
        readMoreBtn.textContent = "Read Less −";

    } else {

        extraText.classList.add("hidden");
        readMoreBtn.textContent = "Read More +";

    }

});


// =====================================
// TASK 3: STUDENT MANAGEMENT
// =====================================

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentCount = document.getElementById("studentCount");

const editForm = document.getElementById("editForm");
const cancelEdit = document.getElementById("cancelEdit");

let students = [];
let editIndex = -1;


// Add student

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let student = {
        name: document.getElementById("studentName").value,
        roll: document.getElementById("studentRoll").value,
        studentClass: document.getElementById("studentClass").value,
        email: document.getElementById("studentEmail").value
    };

    students.push(student);

    studentForm.reset();

    showStudents();

});


// Display students in table

function showStudents() {

    studentTable.innerHTML = "";

    studentCount.textContent = students.length +
        (students.length === 1 ? " Student" : " Students");

    if (students.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 6;
        cell.className = "empty-message";
        cell.textContent = "No student records yet.";

        row.appendChild(cell);
        studentTable.appendChild(row);

        return;
    }

    students.forEach(function(student, index) {

        let row = document.createElement("tr");

        let numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        let rollCell = document.createElement("td");
        rollCell.textContent = student.roll;
        row.appendChild(rollCell);

        let classCell = document.createElement("td");
        classCell.textContent = student.studentClass;
        row.appendChild(classCell);

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;
        row.appendChild(emailCell);

        let actionCell = document.createElement("td");

        // Edit button

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-btn edit-btn";

        editButton.addEventListener("click", function() {
            editStudent(index);
        });

        actionCell.appendChild(editButton);

        // Delete button

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-btn delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        studentTable.appendChild(row);

    });

}


// Delete student

function deleteStudent(index) {

    students.splice(index, 1);

    if (editIndex === index) {
        editForm.classList.add("hidden");
        editIndex = -1;
    } else if (editIndex > index) {
        editIndex--;
    }

    showStudents();

}


// Edit student

function editStudent(index) {

    editIndex = index;

    let student = students[index];

    document.getElementById("editName").value = student.name;
    document.getElementById("editRoll").value = student.roll;
    document.getElementById("editClass").value = student.studentClass;
    document.getElementById("editEmail").value = student.email;

    editForm.classList.remove("hidden");

    editForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// Update student details

editForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (editIndex === -1) {
        return;
    }

    students[editIndex] = {

        name: document.getElementById("editName").value,
        roll: document.getElementById("editRoll").value,
        studentClass: document.getElementById("editClass").value,
        email: document.getElementById("editEmail").value

    };

    editForm.classList.add("hidden");

    editForm.reset();

    editIndex = -1;

    showStudents();

});


// Cancel editing

cancelEdit.addEventListener("click", function() {

    editForm.classList.add("hidden");

    editForm.reset();

    editIndex = -1;

});


// Initial table display

showStudents();