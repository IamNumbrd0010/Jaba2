let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* QTY */
function changeQty(v) {
  qty = Math.max(1, qty + v);
  document.getElementById("qty").innerText = qty;
  updatePreview();
}

/* PREVIEW */
function updatePreview() {
  const budget = document.getElementById("budget").value;
  const items = document.getElementById("items").value;

  let text = "Custom Gift Box";

  if (items) text += ` • ${items}`;

  document.getElementById("previewText").innerText = text;

  const total = (Number(budget) || 0) * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* LIVE INPUT */
["budget", "items"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

/* ADD TO CART (FIXED CORE SYSTEM) */
function addToCart() {
  const budget = document.getElementById("budget").value;
  const items = document.getElementById("items").value;
  const message = document.getElementById("message").value;

  if (!budget) {
    alert("Enter a budget");
    return;
  }

  const newItem = {
    type: "Gift Box",
    name: "Custom Gift Box",
    price: Number(budget),
    qty: qty,
    extras: {
      items: items || "Not specified",
      message: message || ""
    }
  };

  // merge into cart
  order.push(newItem);
  localStorage.setItem("cart", JSON.stringify(order));

  // reset UI
  document.getElementById("budget").value = "";
  document.getElementById("items").value = "";
  document.getElementById("message").value = "";

  qty = 1;
  document.getElementById("qty").innerText = 1;

  updatePreview();

  renderOrder(); // 👈 THIS is what was missing before
}

/* 🧾 LIVE ORDER PREVIEW (IMPORTANT FIX) */
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
        Items: ${o.extras?.items || ""}<br>
        ${o.extras?.message ? "Message: " + o.extras.message + "<br>" : ""}
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

/* CHECKOUT (NO MORE EMPTY SUMMARY) */
function checkout() {
  if (!order.length) {
    alert("Your cart is empty");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(order));
  window.location.href = "summary.html";
}

/* NAV */
function goTo(p) {
  window.location.href = p;
}

/* INIT */
renderOrder();
updatePreview();