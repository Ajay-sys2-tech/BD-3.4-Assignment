const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//   1: Add an Item to the Cart

function addToCart(cart, item) {
  cart.push(item);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let cartItems = addToCart(cart, { productId, name, price, quantity });
  res.json({ cartItems });
});

// 2: Edit Quantity of an Item in the Cart

function editCart(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let cartItems = editCart(cart, productId, quantity);
  res.json({ cartItems });
});

// 3: Delete an Item from the Cart

function deleteFromCart(cart, productId) {
  cart = cart.filter((item) => item.productId !== productId);
  return cart;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  let cartItems = deleteFromCart(cart, productId);
  res.json({ cartItems });
});

// 4: Read Items in the Cart

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// 5: Calculate Total Quantity of Items in the Cart

function totalQuantityInCart(cart) {
  let totalitems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalitems += cart[i].quantity;
  }
  return totalitems;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = totalQuantityInCart(cart);
  res.json({ totalQuantity });
});

// 5: Calculate Total Quantity of Items in the Cart

function totalPriceOfCart(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = totalPriceOfCart(cart);
  res.json({ totalPrice });
});

app.get('/', (req, res) => {
  res.send('Welcome to Cart!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
