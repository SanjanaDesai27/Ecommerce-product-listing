let cart = [];

function displayProducts(productList) {
  const container = document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = "";
  productList.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function filterProducts() {
  const filter = document.getElementById("priceFilter").value;
  let filtered = products;
  if (filter !== "all") {
    const [min, max] = filter.split("-").map(Number);
    filtered = products.filter(p => p.price >= min && p.price <= max);
  }
  displayProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} added to cart!`);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const cartContainer = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartContainer) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<h3>${item.name}</h3><p>₹${item.price}</p>`;
    cartContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.innerText = `Total: ₹${total}`;
}

window.onload = function() {
  if (document.getElementById("productContainer")) {
    displayProducts(products);
  }
  if (document.getElementById("cartContainer")) {
    loadCart();
  }
};
