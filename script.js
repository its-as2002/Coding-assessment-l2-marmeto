const formatPrice = (priceInPaise) => {
	return `Rs. ${(priceInPaise / 100).toLocaleString("en-IN", {
		minimumFractionDigits: 2,
	})}`;
};

const populateCart = (cartData) => {
	const cartItemsContainer = document.getElementById("cart-items");
	const cartSubtotal = document.getElementById("cart-subtotal");
	const cartTotal = document.getElementById("cart-total");
	cartItemsContainer.innerHTML = "";

	cartData.items.forEach((item) => {
		const row = document.createElement("tr");

		row.innerHTML = `
      <td>
        <div class="product-details">
          <img src="${item.image}" alt="${item.title}" class="product-img">
          <p><a href=".">${item.title}</a></p>
        </div>
      </td>
      <td>${formatPrice(item.price)}</td>
      <td><input type="number" value="${
				item.quantity
			}" class="quantity-input"></td>
      <td>${formatPrice(item.line_price)}</td>
      <td><img src="./assets/trash-icon.png" alt="Delete" class="delete-icon"></td>
    `;

		cartItemsContainer.appendChild(row);
	});

	cartSubtotal.textContent = formatPrice(cartData.items_subtotal_price);
	cartTotal.textContent = formatPrice(cartData.items_subtotal_price);
};

const apiData = async () => {
	try {
		const response = await fetch(
			"https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
		);
		const cartData = await response.json();
		populateCart(cartData);
	} catch (error) {
		console.error("Error fetching cart data:", error);
	}
};

apiData();
