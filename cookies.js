let selectedSize = null;
let price = 0;
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* SELECT SIZE */
function selectSize(name, p) {
  document.querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  event.target.classList.add("active");

  selectedSize = name;
  price = p;

  updatePreview();
}

/* QTY */
function changeQty(v) {
  qty = Math.max(1, qty + v);
  document.getElementById("qty").innerText = qty;
  updatePreview();
}

/* PREVIEW */
function updatePreview() {
  const text = selectedSize
    ? `Cookies • ${selectedSize}`
    : "Nothing selected";

  document.getElementById("previewText").innerText = text;

  const total = price * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* ADD TO ORDER */
function addToCart() {
  if (!selectedSize) {
    alert("Select a size");
    return;
  }

  order.push({
    type: "Cookies",
    name: "Cookies",
    size: selectedSize,
    price: price,
    qty: qty
  });

  // SAVE CART
  localStorage.setItem("cart", JSON.stringify(order));

  // reset UI
  selectedSize = null;
  price = 0;
  qty = 1;

  document.getElementById("qty").innerText = 1;

  document.querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  updatePreview();

  renderOrder();
}

/* SHOW ORDER ON PAGE */
function renderOrder() {
  let box = document.getElementById("orderBox");

  if (!box) {
    box = document.createElement("div");
    box.id = "orderBox";
    document.body.appendChild(box);
  }

  box.innerHTML = `<h3 style="padding:15px;">🧾 Your Order</h3>`;

  let total = 0;

  order.forEach((o, i) => {
    const itemTotal = o.price * o.qty;
    total += itemTotal;

    box.innerHTML += `
      <div style="padding:15px;">
        ${i + 1}. ${o.name} (${o.size})<br>
        Qty: ${o.qty}<br>
        ₦${itemTotal.toLocaleString()}
      </div>
    `;
  });

  box.innerHTML += `
    <h3 style="padding:15px;">Total: ₦${total.toLocaleString()}</h3>
    <button class="checkout" onclick="checkout()">Checkout 💬</button>
  `;
}

/* CHECKOUT */
function checkout() {
  if (order.length === 0) {
    alert("Add something first");
    return;
  }

  window.location.href = "summary.html";
}

/* NAV */
function goTo(p) {
  window.location.href = p;
}

/* INIT */
renderOrder();