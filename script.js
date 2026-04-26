document.addEventListener("DOMContentLoaded", () => {

  let selections = {
    size: 0,
    flavor: 0,
    frosting: 0,
    drawing: 0,
    writing: 0,
    qty: 1,
    message: "",
    drawingText: "",
    note: ""
  };

  function setupOptions(id) {
    const group = document.getElementById(id);
    if (!group) return;

    const items = group.querySelectorAll("div");

    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        selections[id] = parseInt(item.dataset.price);
        selections[id + "Text"] = item.innerText;

        if (id === "drawing") {
          const input = document.getElementById("drawingText");

          if (item.dataset.price != "0") {
            input.style.display = "block";
          } else {
            input.style.display = "none";
            input.value = "";
            selections.drawingText = "";
          }
        }

        updateTotal();
      });
    });
  }

  ["size", "flavor", "frosting", "drawing"].forEach(setupOptions);

  const writingInput = document.getElementById("writing");

  if (writingInput) {
    writingInput.addEventListener("input", () => {
      let text = writingInput.value.slice(0, 40);
      writingInput.value = text;

      let price = 0;
      if (text.length > 0) {
        price = 500;
        if (text.length > 10) {
          price += (text.length - 10) * 50;
        }
      }

      selections.writing = price;
      selections.message = text;

      const display = document.getElementById("writingPrice");
      if (display) display.innerText = "₦" + price.toLocaleString();

      updateTotal();
    });
  }

  const drawingInput = document.getElementById("drawingText");
  if (drawingInput) {
    drawingInput.addEventListener("input", () => {
      selections.drawingText = drawingInput.value.slice(0, 40);
    });
  }

  const noteInput = document.getElementById("note");
  if (noteInput) {
    noteInput.addEventListener("input", () => {
      selections.note = noteInput.value;
    });
  }

  window.changeQty = function(val) {
    selections.qty = Math.max(1, selections.qty + val);
    document.getElementById("qty").innerText = selections.qty;
    updateTotal();
  };

  function updateTotal() {
    const total =
      (selections.size +
        selections.flavor +
        selections.frosting +
        selections.drawing +
        selections.writing) * selections.qty;

    const el = document.getElementById("total");
    if (el) el.innerText = "₦" + total.toLocaleString();
  }

  // ✅ ADD TO CART (NEW SYSTEM)
  window.orderNow = function() {
    const basePrice =
      selections.size +
      selections.flavor +
      selections.frosting +
      selections.drawing +
      selections.writing;

    Cart.addItem({
      type: "cake",
      name: "Bento Cake",
      price: basePrice,
      quantity: selections.qty,
      extras: {
        size: selections.sizeText || "Not selected",
        flavor: selections.flavorText || "Not selected",
        frosting: selections.frostingText || "Not selected",
        writing: selections.message || "None",
        drawing: selections.drawing
          ? selections.drawingText || "Yes"
          : "No",
        note: selections.note || "None"
      }
    });

    window.location.href = "summary.html";
  };

  // ✅ SUMMARY PAGE
  function loadSummary() {
    const items = Cart.getItems();
    const box = document.getElementById("summary");

    if (!box) return;

    if (items.length === 0) {
      box.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    let html = "<h3>🧾 Your Order</h3><br>";

    items.forEach((item, i) => {
      html += `<strong>${i + 1}. ${item.name}</strong><br>`;
      html += `Qty: ${item.quantity}<br>`;

      Object.entries(item.extras).forEach(([k, v]) => {
        html += `${k}: ${v}<br>`;
      });

      html += `Price: ₦${item.total.toLocaleString()}<br><br>`;
    });

    html += `<strong>Total: ₦${Cart.getTotal().toLocaleString()}</strong>`;

    box.innerHTML = html;
  }

  window.sendToWhatsApp = function() {
    const msg = Cart.formatWhatsAppMessage();
    window.open(`https://wa.me/2349061307236?text=${msg}`);
  };

  if (window.location.pathname.includes("summary.html")) {
    loadSummary();
  }

  window.goBack = () => window.history.back();

});