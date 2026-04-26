let selected = null;
let price = 0;
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* SELECT */
function selectBalloon(p) {
  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  event.currentTarget.classList.add("active");

  selected = "Hot Air Balloon Package";
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
  const text = selected || "Nothing selected";
  document.getElementById("previewText").innerText = text;

  const total = price * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* ADD TO ORDER */
function addToCart() {
  if (!selected) {
    alert("Select the package");
    return;
  }

  const message = document.getElementById("message").value;

  order.push({
    type: "Hot Air Balloon",
    name: selected,
    price: price,
    message: message,
    qty: qty
  });

  // SAVE TO STORAGE
  localStorage.setItem("cart", JSON.stringify(order));

  // RESET UI
  selected = null;
  price = 0;
  qty = 1;

  document.getElementById("qty").innerText = 1;
  document.getElementById("message").value = "";

  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  updatePreview();

  renderOrder(); // 👈 THIS is what you were missing
}

/* SHOW ORDER ON PAGE */
function renderOrder() {
  const box = document.createElement("div");
  const section = document.querySelector("body");

  let existing = document.getElementById("orderBox");
  if (existing) existing.remove();

  box.id = "orderBox";
  box.innerHTML = `<h3 style="padding:15px;">🧾 Your Order</h3>`;

  let total = 0;

  order.forEach((o, i) => {
    let t = o.price * o.qty;
    total += t;

    box.innerHTML += `
      <div style="padding:15px;">
        ${i + 1}. ${o.name}<br>
        ${o.message ? "Message: " + o.message + "<br>" : ""}
        Qty: ${o.qty}<br>
        ₦${t.toLocaleString()}
      </div>
    `;
  });

  box.innerHTML += `
    <h3 style="padding:15px;">Total: ₦${total.toLocaleString()}</h3>
    <button style="margin:15px;" onclick="checkout()">Checkout 💬</button>
  `;

  section.appendChild(box);
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

/* LOAD EXISTING CART ON PAGE LOAD */
renderOrder();