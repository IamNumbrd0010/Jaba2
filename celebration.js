let flavors = [];
let cakeType = null;
let selected = {};
let qty = 1;
let order = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   FLAVORS
========================= */
document.querySelectorAll(".flavor").forEach(f => {
  f.onclick = () => {
    f.classList.toggle("active");

    const val = f.innerText;

    if (flavors.includes(val)) {
      flavors = flavors.filter(x => x !== val);
    } else {
      flavors.push(val);
    }

    updatePreview();
  };
});

/* =========================
   TYPE
========================= */
document.querySelectorAll(".type-card").forEach(card => {
  card.onclick = () => {
    document.querySelectorAll(".type-card")
      .forEach(c => c.classList.remove("active"));

    card.classList.add("active");
    cakeType = card.dataset.type;

    selected = {};
    renderOptions();
    updatePreview();
  };
});

/* =========================
   OPTIONS
========================= */
function renderOptions() {
  const box = document.getElementById("options");
  box.innerHTML = "";

  if (cakeType === "foil") {
    box.innerHTML = `
      <div class="option-btn" onclick="selectOption('size','Small',2000)">Small — ₦2,000</div>
      <div class="option-btn" onclick="selectOption('size','Medium',4000)">Medium — ₦4,000</div>
      <div class="option-btn" onclick="selectOption('size','Maxi',5500)">Maxi — ₦5,500</div>
    `;
  }

  if (cakeType === "bento") {
    box.innerHTML = `
      <div class="option-btn" onclick="selectOption('size','4 inch',8000)">4 inch — ₦8,000</div>
      <div class="option-btn" onclick="selectOption('size','5 inch',12000)">5 inch — ₦12,000</div>
    `;
  }

  if (cakeType === "celebration") {
    box.innerHTML = `
      <h4>Size</h4>
      <div class="size-row">
        <div class="size-pill" onclick="selectSize(6)">6</div>
        <div class="size-pill" onclick="selectSize(7)">7</div>
        <div class="size-pill" onclick="selectSize(8)">8</div>
        <div class="size-pill" onclick="selectSize(9)">9</div>
        <div class="size-pill" onclick="selectSize(10)">10</div>
      </div>
      <div id="layerBox"></div>
    `;
  }
}

/* =========================
   SIZE + LAYER
========================= */
function selectSize(size) {
  document.querySelectorAll(".size-pill")
    .forEach(p => p.classList.remove("active"));

  event.target.classList.add("active");

  selected.size = size;
  renderLayers();
}

function renderLayers() {
  const box = document.getElementById("layerBox");

  const prices = {
    6: [15000, 30000],
    7: [18000, 36000],
    8: [21000, 42000],
    9: [24000, 48000],
    10: [29000]
  };

  const p = prices[selected.size];
  if (!p) return;

  box.innerHTML = "<h4>Layer</h4>";

  if (p.length === 1) {
    box.innerHTML += `
      <div class="option-btn" onclick="selectLayer('Single',${p[0]})">
        Single — ₦${p[0].toLocaleString()}
      </div>
    `;
  } else {
    box.innerHTML += `
      <div class="option-btn" onclick="selectLayer('Single',${p[0]})">
        Single — ₦${p[0].toLocaleString()}
      </div>
      <div class="option-btn" onclick="selectLayer('2 Layers',${p[1]})">
        2 Layers — ₦${p[1].toLocaleString()}
      </div>
    `;
  }
}

function selectOption(key, name, price) {
  document.querySelectorAll(".option-btn")
    .forEach(b => b.classList.remove("active"));

  event.target.classList.add("active");

  selected[key] = name;
  selected.price = price;

  updatePreview();
}

function selectLayer(name, price) {
  document.querySelectorAll("#layerBox .option-btn")
    .forEach(b => b.classList.remove("active"));

  event.target.classList.add("active");

  selected.layer = name;
  selected.price = price;

  updatePreview();
}

/* =========================
   QTY + PREVIEW
========================= */
function changeQty(v) {
  qty = Math.max(1, qty + v);
  document.getElementById("qty").innerText = qty;
  updatePreview();
}

function updatePreview() {
  let text = cakeType || "Nothing selected";

  if (selected.size) text += ` • ${selected.size}`;
  if (selected.layer) text += ` • ${selected.layer}`;
  if (flavors.length) text += ` • ${flavors.join(", ")}`;

  document.getElementById("previewText").innerText = text;

  const total = (selected.price || 0) * qty;

  document.getElementById("previewPrice").innerText =
    "₦" + total.toLocaleString();
}

/* =========================
   ADD TO CART (FIXED CORE)
========================= */
function addToCart() {
  if (!selected.price) return alert("Complete selection");

  const item = {
    type: cakeType,
    size: selected.size || "",
    layer: selected.layer || "",
    flavors: [...flavors],
    price: selected.price,
    qty: qty
  };

  order.push(item);

  localStorage.setItem("cart", JSON.stringify(order));

  // reset UI
  selected = {};
  flavors = [];
  qty = 1;

  document.getElementById("qty").innerText = 1;

  document.querySelectorAll(".flavor").forEach(f => f.classList.remove("active"));
  document.querySelectorAll(".type-card").forEach(c => c.classList.remove("active"));
  document.getElementById("options").innerHTML = "";

  updatePreview();
  renderOrder();
}

/* =========================
   LIVE CART PREVIEW
========================= */
function renderOrder() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";

  let total = 0;

  order.forEach((o, i) => {
    const itemTotal = o.price * o.qty;
    total += itemTotal;

    list.innerHTML += `
      <div style="padding:10px 0;">
        ${i+1}. ${o.type || "Cake"}<br>
        ${o.size ? "Size: " + o.size + "<br>" : ""}
        ${o.layer ? "Layer: " + o.layer + "<br>" : ""}
        ${o.flavors.length ? "Flavors: " + o.flavors.join(", ") + "<br>" : ""}
        Qty: ${o.qty}<br>
        ₦${itemTotal.toLocaleString()}
      </div>
    `;
  });

  document.getElementById("total").innerText =
    "Total: ₦" + total.toLocaleString();
}

/* =========================
   CHECKOUT
========================= */
function checkout() {
  if (!order.length) return alert("Add something first");

  window.location.href = "summary.html";
}

/* NAV */
function goTo(p) {
  window.location.href = p;
}

/* INIT */
renderOrder();
updatePreview();