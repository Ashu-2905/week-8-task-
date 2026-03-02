// ================= AUTH =================

function toggleForm() {
    const title = document.getElementById("formTitle");
    const regBtn = document.getElementById("registerBtn");
    const logBtn = document.getElementById("loginBtn");

    if (title.innerText === "Register") {
        title.innerText = "Login";
        regBtn.style.display = "none";
        logBtn.style.display = "block";
    } else {
        title.innerText = "Register";
        regBtn.style.display = "block";
        logBtn.style.display = "none";
    }
}

function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (!name || !email || !pass) return alert("Fill all fields");

    localStorage.setItem("user", JSON.stringify({ name, email, pass }));
    alert("Registered Successfully!");
    toggleForm();
}

function loginUser() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== email || user.pass !== pass) {
        return alert("Invalid Credentials!");
    }

    localStorage.setItem("loggedIn", "true");
    window.location = "home.html";
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location = "index.html";
}

// ================= HOME PAGE =================

if (window.location.pathname.includes("home.html")) {

    if (localStorage.getItem("loggedIn") !== "true") {
        window.location = "index.html";
    }

    const products = [
        { id:1, name:"Smartphone", price:12000, img:"https://picsum.photos/200?1" },
        { id:2, name:"Laptop", price:45000, img:"https://picsum.photos/200?2" },
        { id:3, name:"Shoes", price:3000, img:"https://picsum.photos/200?3" },
        { id:4, name:"Watch", price:2500, img:"https://picsum.photos/200?4" }
    ];

    const productGrid = document.getElementById("productGrid");

    products.forEach(p => {
        productGrid.innerHTML += `
        <div class="product-card">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            <button class="buy-btn" onclick="buyNow(${p.id})">Buy Now</button>
        </div>`;
    });

    window.addToCart = function(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = products.find(p => p.id === id);
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to Cart!");
    };

    window.buyNow = function(id) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        const product = products.find(p => p.id === id);
        orders.push(product);
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Your product is placed successfully!");
    };
}

function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function goProfile() {
    window.location = "profile.html";
}

function goHome() {
    window.location = "home.html";
}

// ================= PROFILE =================

if (window.location.pathname.includes("profile.html")) {

    if (localStorage.getItem("loggedIn") !== "true") {
        window.location = "index.html";
    }

    const cartContainer = document.getElementById("cartContainer");
    const orderContainer = document.getElementById("orderContainer");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
        <div class="product-card">
            <img src="${item.img}">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button class="add-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>`;
    });

    orders.forEach(item => {
        orderContainer.innerHTML += `
        <div class="product-card">
            <img src="${item.img}">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <p style="color:green;">Order Placed ✅</p>
        </div>`;
    });

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    };
}
