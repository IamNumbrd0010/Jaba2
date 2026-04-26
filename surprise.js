let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* RENDER CART PREVIEW */
function renderCartPreview() {
  const box = document.getElementById("cartPreview");
  box.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>No items yet</p>";
    document.getElementById("cartTotal").innerText = "₦0";
    return;
  }

  cart.forEach((item, i) => {
    let itemTotal = (item.price || item.budget) * item.qty;
    total += itemTotal;

    box.innerHTML += `
      <p>
        ${i+1}. ${item.type || item.name}<br>
        Qty: ${item.qty}<br>
        ₦${itemTotal.toLocaleString()}
      </p>
    `;
  });

  document.getElementById("cartTotal").innerText =
    "Total: ₦" + total.toLocaleString();
}

/* NAV */
function goTo(page) {
  window.location.href = page;
}

/* INIT */
renderCartPreview();