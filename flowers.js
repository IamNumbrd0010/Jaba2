let selected = {};
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* SELECT */
function selectOption(name, detail, price) {
  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  event.currentTarget.classList.add("active");

  selected = { name, detail, price };

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
  let text = selected.name || "Nothing selected";

  if (selected.detail) text += ` • ${selected.detail}`;

  document.getElementById("previewText").innerText = text;

  const total = (selected.price || 0) * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* ADD TO CART */
function addToCart() {
  if (!selected.price) {
    alert("Select a bouquet");
    return;
  }

  const message = document.getElementById("message").value;

  order.push({
    type: "Flower Bouquet",
    name: selected.name,
    detail: selected.detail,
    price: selected.price,
    qty: qty,
    message: message || ""
  });

  // SAVE CART
  localStorage.setItem("cart", JSON.stringify(order));

  // RESET UI
  selected = {};
  qty = 1;

  document.getElementById("qty").innerText = 1;
  document.getElementById("message").value = "";

  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  updatePreview();

  renderOrder();
}

/* ORDER PREVIEW ON PAGE */
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
        ${i + 1}. ${o.name}<br>
        ${o.detail || ""}<br>
        ${o.message ? "Message: " + o.message + "<br>" : ""}
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