// cart.js

const Cart = (() => {
    const STORAGE_KEY = "bakery_cart_v1";
  
    let cart = [];
  
    const load = () => {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        cart = data ? JSON.parse(data) : [];
      } catch {
        cart = [];
      }
    };
  
    const save = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    };
  
    const generateId = () =>
      "item_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
  
    const createItem = ({ type, name, price, quantity, extras }) => ({
      id: generateId(),
      type,
      name,
      price,
      quantity,
      extras,
      total: price * quantity
    });
  
    const addItem = (itemData) => {
      const newItem = createItem(itemData);
  
      const existingIndex = cart.findIndex(item =>
        item.type === newItem.type &&
        item.name === newItem.name &&
        JSON.stringify(item.extras) === JSON.stringify(newItem.extras)
      );
  
      if (existingIndex > -1) {
        cart[existingIndex].quantity += newItem.quantity;
        cart[existingIndex].total =
          cart[existingIndex].price * cart[existingIndex].quantity;
      } else {
        cart.push(newItem);
      }
  
      save();
    };
  
    const getItems = () => cart;
  
    const getTotal = () =>
      cart.reduce((sum, item) => sum + item.total, 0);
  
    const clear = () => {
      cart = [];
      save();
    };
  
    const formatWhatsAppMessage = () => {
      if (cart.length === 0) return "No items in cart.";
  
      let msg = "🧁 *New Order* %0A%0A";
  
      cart.forEach((item, i) => {
        msg += `*${i + 1}. ${item.name}*%0A`;
        msg += `Qty: ${item.quantity}%0A`;
  
        Object.entries(item.extras || {}).forEach(([k, v]) => {
          msg += `- ${k}: ${v}%0A`;
        });
  
        msg += `Price: ₦${item.total.toLocaleString()}%0A%0A`;
      });
  
      msg += `*Total: ₦${getTotal().toLocaleString()}*`;
  
      return msg;
    };
  
    load();
  
    return {
      addItem,
      getItems,
      getTotal,
      clear,
      formatWhatsAppMessage
    };
  })();