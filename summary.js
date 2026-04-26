let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadSummary() {
  const box = document.getElementById("summaryBox");
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty 😢</p>";
    document.getElementById("totalPrice").innerText = "₦0";
    return;
  }

  let total = 0;

  cart.forEach((item, i) => {
    let price = Number(item.price || item.budget || 0);
    let itemTotal = price * item.qty;
    total += itemTotal;

    box.innerHTML += `
      <div style="
        background:white;
        padding:12px;
        border-radius:12px;
        margin-bottom:12px;
      ">
        <strong>${i + 1}. ${item.type || item.name}</strong><br>

        ${item.name ? item.name + "<br>" : ""}
        ${item.size ? "Size: " + item.size + "<br>" : ""}
        ${item.layer ? "Layer: " + item.layer + "<br>" : ""}
        ${item.flavors ? "Flavors: " + item.flavors.join(", ") + "<br>" : ""}
        ${item.detail ? item.detail + "<br>" : ""}
        ${item.note ? item.note + "<br>" : ""}
        ${item.items ? "Items: " + item.items + "<br>" : ""}
        ${item.caption ? "Caption: " + item.caption + "<br>" : ""}
        ${item.message ? "Message: " + item.message + "<br>" : ""}

        Qty: ${item.qty}<br>
        ₦${itemTotal.toLocaleString()}
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText =
    "Total: ₦" + total.toLocaleString();
}

/* WHATSAPP */
function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let text = "Hello, I’d like to place an order:\n\n";

  let total = 0;

  cart.forEach((item, i) => {
    let price = Number(item.price || item.budget || 0);
    let itemTotal = price * item.qty;
    total += itemTotal;

    text += `${i + 1}. ${item.type || item.name}\n`;

    if (item.name) text += `${item.name}\n`;
    if (item.size) text += `Size: ${item.size}\n`;
    if (item.layer) text += `Layer: ${item.layer}\n`;
    if (item.flavors) text += `Flavors: ${item.flavors.join(", ")}\n`;
    if (item.detail) text += `${item.detail}\n`;
    if (item.note) text += `${item.note}\n`;
    if (item.items) text += `Items: ${item.items}\n`;
    if (item.caption) text += `Caption: ${item.caption}\n`;
    if (item.message) text += `Message: ${item.message}\n`;

    text += `Qty: ${item.qty}\n`;
    text += `₦${itemTotal.toLocaleString()}\n\n`;
  });

  text += `Total: ₦${total.toLocaleString()}`;

  // ⚠️ REPLACE WITH YOUR NUMBER
  let phone = "2349064650080";

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}

/* CLEAR CART */
function clearCart() {
  if (!confirm("Clear your cart?")) return;

  localStorage.removeItem("cart");
  cart = [];

  loadSummary();
}

/* NAV */
function goBack() {
  window.history.back();
}

/* INIT */
loadSummary();