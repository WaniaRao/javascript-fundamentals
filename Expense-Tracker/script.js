// Getting HTML Elements

var transactionForm = document.getElementById("transactionForm");

var titleInput = document.getElementById("title");
var amountInput = document.getElementById("amount");
var typeInput = document.getElementById("type");
var categoryInput = document.getElementById("category");
var dateInput = document.getElementById("date");

var totalBalance = document.getElementById("totalBalance");
var totalIncome = document.getElementById("totalIncome");
var totalExpense = document.getElementById("totalExpense");

var transactionList = document.getElementById("transactionList");
var searchInput = document.getElementById("searchInput");
var transactionCount = document.getElementById("transactionCount");

var filterButtons = document.querySelectorAll(".filter-btn");


// Store Transactions

var transactions = JSON.parse(localStorage.getItem("myTransactions")) || [];

var currentFilter = "all";


// Today's Date

var today = new Date();

var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");

var todayString = year + "-" + month + "-" + day;

dateInput.value = todayString;

document.getElementById("todayDate").textContent =
    today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });


// Format Money

function formatMoney(amount) {
    return "Rs. " + Number(amount).toLocaleString("en-PK", {
        maximumFractionDigits: 2
    });
}


// Add Transaction

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var transactionTitle = titleInput.value.trim();
    var transactionAmount = Number(amountInput.value);
    var transactionType = typeInput.value;
    var transactionCategory = categoryInput.value;
    var transactionDate = dateInput.value;

    if (transactionTitle === "" || transactionAmount <= 0 || !transactionDate) {
        alert("Please enter valid transaction details!");
        return;
    }

    var newTransaction = {
        id: Date.now(),
        title: transactionTitle,
        amount: transactionAmount,
        type: transactionType,
        category: transactionCategory,
        date: transactionDate
    };

    transactions.push(newTransaction);

    saveTransactions();

    transactionForm.reset();

    dateInput.value = todayString;

    showTransactions();

});


// Save Data in Local Storage

function saveTransactions() {

    localStorage.setItem("myTransactions", JSON.stringify(transactions));

}


// Update Summary Cards

function updateSummary() {

    var income = 0;
    var expense = 0;

    for (var i = 0; i < transactions.length; i++) {

        if (transactions[i].type === "income") {
            income = income + transactions[i].amount;
        } else {
            expense = expense + transactions[i].amount;
        }

    }

    var balance = income - expense;

    totalBalance.textContent = formatMoney(balance);
    totalIncome.textContent = formatMoney(income);
    totalExpense.textContent = formatMoney(expense);

}


// Show Transactions

function showTransactions() {

    transactionList.innerHTML = "";

    var searchValue = searchInput.value.toLowerCase();

    var filteredTransactions = [];

    for (var i = 0; i < transactions.length; i++) {

        var transaction = transactions[i];

        var matchesSearch =
            transaction.title.toLowerCase().includes(searchValue) ||
            transaction.category.toLowerCase().includes(searchValue);

        var matchesFilter =
            currentFilter === "all" ||
            transaction.type === currentFilter;

        if (matchesSearch && matchesFilter) {
            filteredTransactions.push(transaction);
        }

    }

    // Show Empty Message

    if (filteredTransactions.length === 0) {

        var emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-state";

        var emptyIcon = document.createElement("div");
        emptyIcon.className = "empty-icon";
        emptyIcon.textContent = "◈";

        var emptyTitle = document.createElement("h3");
        emptyTitle.textContent = transactions.length === 0
            ? "No transactions yet"
            : "No matching transactions";

        var emptyText = document.createElement("p");
        emptyText.textContent = transactions.length === 0
            ? "Add your first transaction to get started."
            : "Try another search or filter.";

        emptyMessage.appendChild(emptyIcon);
        emptyMessage.appendChild(emptyTitle);
        emptyMessage.appendChild(emptyText);

        transactionList.appendChild(emptyMessage);

    }

    // Display Transactions

    for (var i = filteredTransactions.length - 1; i >= 0; i--) {

        var item = filteredTransactions[i];

        var transactionItem = document.createElement("div");
        transactionItem.className = "transaction-item";

        var transactionLeft = document.createElement("div");
        transactionLeft.className = "transaction-left";

        var transactionIcon = document.createElement("div");
        transactionIcon.className = "transaction-icon " + item.type;
        transactionIcon.textContent = item.type === "income" ? "↗" : "↘";

        var transactionInfo = document.createElement("div");
        transactionInfo.className = "transaction-info";

        var transactionName = document.createElement("h3");
        transactionName.textContent = item.title;

        var transactionDetails = document.createElement("p");
        transactionDetails.textContent = item.category + " · " + item.date;

        transactionInfo.appendChild(transactionName);
        transactionInfo.appendChild(transactionDetails);

        transactionLeft.appendChild(transactionIcon);
        transactionLeft.appendChild(transactionInfo);

        var transactionRight = document.createElement("div");
        transactionRight.className = "transaction-right";

        var transactionAmount = document.createElement("span");
        transactionAmount.className = "transaction-amount " + item.type;

        var sign = item.type === "income" ? "+" : "-";

        transactionAmount.textContent = sign + formatMoney(item.amount);

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "✕";
        deleteButton.title = "Delete transaction";

        deleteButton.addEventListener("click", function(id) {

            return function() {
                deleteTransaction(id);
            };

        }(item.id));

        transactionRight.appendChild(transactionAmount);
        transactionRight.appendChild(deleteButton);

        transactionItem.appendChild(transactionLeft);
        transactionItem.appendChild(transactionRight);

        transactionList.appendChild(transactionItem);

    }

    transactionCount.textContent = transactions.length + " entries";

    updateSummary();

}


// Delete Transaction

function deleteTransaction(id) {

    var confirmDelete = confirm("Are you sure you want to delete this transaction?");

    if (confirmDelete) {

        transactions = transactions.filter(function(item) {
            return item.id !== id;
        });

        saveTransactions();

        showTransactions();

    }

}


// Search Transactions

searchInput.addEventListener("input", function() {

    showTransactions();

});


// Filter Transactions

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.getAttribute("data-filter");

        showTransactions();

    });

});


// Initial Display

showTransactions();