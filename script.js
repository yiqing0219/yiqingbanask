// 初始化购物车和侧边栏
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsList = document.getElementById("cartItemsList");
const closeCartSidebar = document.getElementById("closeCartSidebar");

// 打开和关闭侧边栏
function toggleCartSidebar() {
  cartSidebar.classList.toggle("open");
}

// 关闭侧边栏按钮
closeCartSidebar.addEventListener("click", toggleCartSidebar);

// 购物车数据
let cart = [];

// 添加面包到购物车功能
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const itemName = card.getAttribute("data-name");
    const itemPrice = card.getAttribute("data-price");

    // 创建购物车项
    const cartItem = cart.find(item => item.name === itemName);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCart();
    toggleCartSidebar();
  });
});

// 更新购物车显示
function updateCart() {
  cartItemsList.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsList.appendChild(cartItem);
  });
}

// 从购物车移除商品
function removeFromCart(index) {
  cart[index].quantity--;
  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }
  updateCart();
}
