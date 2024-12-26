function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline";
        localStorage.setItem("theme", "dark");
    } else {
        sunIcon.style.display = "inline";
        moonIcon.style.display = "none";
        localStorage.setItem("theme", "light");
    }
}

window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("sun-icon").style.display = "none";
        document.getElementById("moon-icon").style.display = "inline";
    }
};

//  add an item to the grocery list
function addItem() {
    const itemName = document.getElementById("item-name").value;
    const itemQuantity = document.getElementById("item-quantity").value;
    const itemPrice = document.getElementById("item-price").value;

    if (!itemName || !itemQuantity || !itemPrice) {
        alert("Please fill out all fields!");
        return;
    }

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.classList.add("shopping-item");

    // Create the content for the list item
    listItem.innerHTML = `
        <span class="item-name">${itemName} (x${itemQuantity}) - $${(itemPrice * itemQuantity).toFixed(2)}</span>
        <button class="remove-item" onclick="removeItem(this)">Remove</button>
    `;

    // Add the new item to the list
    document.getElementById("item-list").appendChild(listItem);

    // Clear the input fields
    document.getElementById("item-name").value = "";
    document.getElementById("item-quantity").value = "";
    document.getElementById("item-price").value = "";

    // Update the total cost
    updateTotal();
}

// Function to remove an item from the list
function removeItem(button) {
    // Remove the list item when the remove button is clicked
    button.parentElement.remove();

    // Update the total cost after removal
    updateTotal();
}

// Function to update the total cost
function updateTotal() {
    const items = document.querySelectorAll(".shopping-item");
    let total = 0;

    // Loop through all items and calculate the total cost
    items.forEach(item => {
        const priceText = item.querySelector(".item-name").textContent;
        const priceMatch = priceText.match(/\$(\d+(\.\d{2})?)/);
        if (priceMatch) {
            total += parseFloat(priceMatch[1]);
        }
    });

    // Display the total price
    document.getElementById("total-price").textContent = total.toFixed(2);
}
