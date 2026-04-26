let selected = null;
let price = 0;
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* SELECT OPTION */
function selectOption(name, p) {
  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  event.currentTarget.classList.add("active");

  selected = name;
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
  document.getElementById("previewText").innerText =
    selected || "Nothing selected";

  const total = price * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* ADD TO ORDER */
function addToCart() {
  if (!selected) {
    alert("Select a card");
    return;
  }

  const message = document.getElementById("message").value;

  order.push({
    type: "Card",
    name: selected,
    price: price,
    qty: qty,
    message: message
  });

  // save cart
  localStorage.setItem("cart", JSON.stringify(order));

  // reset UI
  selected = null;
  price = 0;
  qty = 1;

  document.getElementById("qty").innerText = 1;
  document.getElementById("message").value = "";

  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

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
        ${i + 1}. ${o.name}<br>
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