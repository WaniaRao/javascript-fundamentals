
var cart = [];

function addToCart(name, price) {

    var found = false;

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].name == name) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {

        var product = {
            name: name,
            price: price,
            quantity: 1
        };

        cart.push(product);
    }

    showCart();
}

function showCart() {

    var cartItems = document.getElementById("cartItems");

    var totalPrice = 0;
    var totalItems = 0;

    cartItems.innerHTML = "";

    if (cart.length == 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Start shopping!</p>';
    }

    for (var i = 0; i < cart.length; i++) {

        var itemTotal = cart[i].price * cart[i].quantity;

        totalPrice = totalPrice + itemTotal;
        totalItems = totalItems + cart[i].quantity;

        cartItems.innerHTML +=
            '<div class="cart-item">' +

                '<div>' +
                    '<h3>' + cart[i].name + '</h3>' +
                    '<p>Rs. ' + cart[i].price.toLocaleString() + '</p>' +
                '</div>' +

                '<div class="quantity">' +
                    '<button onclick="decreaseQuantity(' + i + ')">-</button>' +
                    '<span>' + cart[i].quantity + '</span>' +
                    '<button onclick="increaseQuantity(' + i + ')">+</button>' +
                '</div>' +

                '<div>' +
                    '<h3>Rs. ' + itemTotal.toLocaleString() + '</h3>' +
                    '<button class="remove-btn" onclick="removeItem(' + i + ')">Remove</button>' +
                '</div>' +

            '</div>';
    }

    document.getElementById("totalPrice").innerHTML =
        "Rs. " + totalPrice.toLocaleString();

    document.getElementById("cartCount").innerHTML = totalItems;

    document.getElementById("totalItems").innerHTML =
        totalItems + (totalItems == 1 ? " Item" : " Items");
}

function increaseQuantity(index) {

    cart[index].quantity++;

    showCart();
}

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity == 0) {
        cart.splice(index, 1);
    }

    showCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    showCart();
}

showCart();
