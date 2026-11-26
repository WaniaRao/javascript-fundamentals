
var destinationForm = document.getElementById("destinationForm");
var destinationList = document.getElementById("destinationList");
var emptyState = document.getElementById("emptyState");
var searchInput = document.getElementById("searchInput");

var totalCount = document.getElementById("totalCount");
var visitedCount = document.getElementById("visitedCount");
var progressText = document.getElementById("progressText");
var progressBar = document.getElementById("progressBar");

var destinations = JSON.parse(localStorage.getItem("destinations")) || [];
var currentFilter = "all";

// Save destinations
function saveDestinations() {
    localStorage.setItem("destinations", JSON.stringify(destinations));
}

// Display destinations
function showDestinations() {
    destinationList.innerHTML = "";

    var searchValue = searchInput.value.toLowerCase();
    var filteredDestinations = [];

    for (var i = 0; i < destinations.length; i++) {
        var place = destinations[i];

        var matchesSearch =
            place.name.toLowerCase().includes(searchValue) ||
            place.city.toLowerCase().includes(searchValue) ||
            place.country.toLowerCase().includes(searchValue);

        var matchesFilter = true;

        if (currentFilter === "visited" && !place.visited) {
            matchesFilter = false;
        }

        if (currentFilter === "want" && place.visited) {
            matchesFilter = false;
        }

        if (matchesSearch && matchesFilter) {
            filteredDestinations.push(place);
        }
    }

    if (filteredDestinations.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    for (var i = 0; i < filteredDestinations.length; i++) {
        var place = filteredDestinations[i];

        var image = place.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";

        var statusText = place.visited ? "Visited" : "Want to visit";
        var statusClass = place.visited ? "visited" : "";

        var buttonText = place.visited ? "Mark as unvisited" : "Mark as visited";

        var card = `
            <div class="col-md-6 col-lg-4">
                <div class="destination-card">
                    <div class="destination-image">
                        <img src="${image}" alt="${place.name}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>

                    <div class="card-content">
                        <span class="card-location">
                            <i class="bi bi-geo-alt-fill"></i>
                            ${place.city}, ${place.country}
                        </span>

                        <h4>${place.name}</h4>
                        <p class="card-note">${place.note || "A beautiful place waiting to be explored."}</p>

                        <div class="card-actions">
                            <button class="visit-btn" onclick="toggleVisited(${place.id})">
                                <i class="bi bi-check2"></i> ${buttonText}
                            </button>

                            <button class="delete-btn" onclick="deleteDestination(${place.id})" title="Delete destination">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        destinationList.innerHTML += card;
    }

    updateStats();
}

// Add destination
destinationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var newDestination = {
        id: Date.now(),
        name: document.getElementById("placeName").value.trim(),
        city: document.getElementById("cityName").value.trim(),
        country: document.getElementById("countryName").value.trim(),
        image: document.getElementById("imageUrl").value.trim(),
        note: document.getElementById("travelNote").value.trim(),
        visited: false
    };

    destinations.push(newDestination);

    saveDestinations();
    showDestinations();

    destinationForm.reset();

    var modal = bootstrap.Modal.getInstance(document.getElementById("addModal"));
    modal.hide();
});

// Mark visited / unvisited
function toggleVisited(id) {
    for (var i = 0; i < destinations.length; i++) {
        if (destinations[i].id === id) {
            destinations[i].visited = !destinations[i].visited;
            break;
        }
    }

    saveDestinations();
    showDestinations();
}

// Delete destination
function deleteDestination(id) {
    var confirmDelete = confirm("Are you sure you want to delete this destination?");

    if (confirmDelete) {
        destinations = destinations.filter(function(place) {
            return place.id !== id;
        });

        saveDestinations();
        showDestinations();
    }
}

// Search
searchInput.addEventListener("input", function() {
    showDestinations();
});

// Filter buttons
var filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.getAttribute("data-filter");

        showDestinations();
    });
});

// Update statistics
function updateStats() {
    var visited = 0;

    for (var i = 0; i < destinations.length; i++) {
        if (destinations[i].visited) {
            visited++;
        }
    }

    var total = destinations.length;
    var percentage = 0;

    if (total > 0) {
        percentage = Math.round((visited / total) * 100);
    }

    totalCount.innerText = total;
    visitedCount.innerText = visited;
    progressText.innerText = percentage + "%";
    progressBar.style.width = percentage + "%";
}

// Load saved destinations
showDestinations();
