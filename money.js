let selected = {};
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* SELECT */
function selectOption(name, note, price) {
  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  event.currentTarget.classList.add("active");

  selected = { name, note, price };

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

  if (selected.note) text += ` • ${selected.note}`;

  document.getElementById("previewText").innerText = text;

  const total = (selected.price || 0) * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* ADD TO CART (FIXED CORE SYSTEM) */
function addToCart() {
  if (!selected.price) {
    alert("Select a bouquet");
    return;
  }

  const caption = document.getElementById("caption").value;

  const newItem = {
    type: "Money Bouquet",
    name: selected.name,
    price: selected.price,
    qty: qty,
    extras: {
      note: selected.note || "",
      caption: caption || ""
    }
  };

  // push into shared cart
  order.push(newItem);
  localStorage.setItem("cart", JSON.stringify(order));

  // reset UI
  selected = {};
  qty = 1;

  document.getElementById("qty").innerText = 1;
  document.getElementById("caption").value = "";

  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  updatePreview();

  renderOrder();
}

/* 🧾 LIVE ORDER PREVIEW (THIS FIXES YOUR “NO PREVIEW” ISSUE) */
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
        ${o.extras?.note ? "Note: " + o.extras.note + "<br>" : ""}
        ${o.extras?.caption ? "Caption: " + o.extras.caption + "<br>" : ""}
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