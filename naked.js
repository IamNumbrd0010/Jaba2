let selectedCake = null;
let selectedPrice = 0;
let qty = 1;
let selectedFlavors = [];
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   CAKE SELECTION
========================= */
document.querySelectorAll(".cake-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".cake-item")
      .forEach(i => i.classList.remove("active"));

    item.classList.add("active");

    selectedCake = item.dataset.name;
    selectedPrice = Number(item.dataset.price);

    updatePreview();
  });
});

/* =========================
   FLAVORS
========================= */
document.querySelectorAll(".flavor").forEach(f => {
  f.addEventListener("click", () => {
    f.classList.toggle("active");

    const val = f.innerText;

    if (selectedFlavors.includes(val)) {
      selectedFlavors = selectedFlavors.filter(x => x !== val);
    } else {
      selectedFlavors.push(val);
    }

    updatePreview();
  });
});

/* =========================
   QTY
========================= */
function changeQty(val) {
  qty = Math.max(1, qty + val);
  document.getElementById("qty").innerText = qty;
  updatePreview();
}

/* =========================
   PREVIEW (MAIN)
========================= */
function updatePreview() {
  const preview = document.getElementById("previewPrice");

  if (!selectedCake) {
    preview.innerText = "₦0";
    return;
  }

  const total = selectedPrice * qty;

  preview.innerText = "₦" + total.toLocaleString();
}

/* =========================
   ADD TO CART
========================= */
function addToOrder() {
  if (!selectedCake) return alert("Select a cake first");

  if (selectedFlavors.length === 0) {
    return alert("Select at least one flavor");
  }

  const item = {
    type: "Naked Cake",
    name: selectedCake,
    price: selectedPrice,
    qty: qty,
    flavors: [...selectedFlavors]
  };

  order.push(item);
  localStorage.setItem("cart", JSON.stringify(order));

  resetUI();
  renderOrder();
}

/* =========================
   RESET UI
========================= */
function resetUI() {
  selectedCake = null;
  selectedPrice = 0;
  selectedFlavors = [];
  qty = 1;

  document.getElementById("qty").innerText = 1;
  document.getElementById("previewPrice").innerText = "₦0";

  document.querySelectorAll(".cake-item")
    .forEach(i => i.classList.remove("active"));

  document.querySelectorAll(".flavor")
    .forEach(f => f.classList.remove("active"));
}

/* =========================
   RENDER ORDER (LIVE CART)
========================= */
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
      <div style="padding:15px; border-bottom:1px solid #eee;">
        <b>${i + 1}. ${o.name}</b><br>
        Flavors: ${o.flavors.join(", ")}<br>
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

/* =========================
   CHECKOUT
========================= */
function checkout() {
  if (order.length === 0) {
    alert("Your cart is empty");
    return;
  }

  window.location.href = "summary.html";
}

/* =========================
   NAV
========================= */
function goTo(page) {
  window.location.href = page;
}

/* =========================
   INIT
========================= */
renderOrder();