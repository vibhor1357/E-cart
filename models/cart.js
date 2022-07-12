// const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const p=path.join(
  path.dirname(require.main.filename),
'data',
'cart.json'
);

module.exports = class Cart {
  static addproduct(id, productprice) {
    // Fetch the previous cart
    fs.readFile(p, (err, filecontent) => {
      let cart = { products: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      // Analyze the cart => Find existing product
      const existingproductindex = cart.products.findIndex( 
        prod => prod.id === id
        );
      const existingproduct = cart.products[existingproductindex];
      let updatedproduct;
      // Add new product/ increase quantity
      if (existingproduct) {
        updatedproduct = { ...existingproduct };
        updatedproduct.qty = updatedproduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingproductindex] = updatedproduct;
      } else {
        updatedproduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedproduct];
      }
      cart.totalprice = cart.totalprice + +productprice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

static deleteproduct(id, productprice) {
  fs.readFile(p, (err, filecontent) => {
    if (err) {
      return;
    }
    const updatedcart = { ...JSON.parse(filecontent) };
    const product = updatedcart.products.find(prod => prod.id === id);
    if(!product){
      return;
    }
    const productqty = product.qty;
    updatedcart.products = updatedcart.products.filter(
      prod => prod.id !== id
    );
    updatedcart.totalprice =
      updatedcart.totalprice - productprice * productqty;

    fs.writeFile(p, JSON.stringify(updatedcart), err => {
      console.log(err);
    });
  });
}

static getcart(cb) {
  fs.readFile(p, (err, filecontent) => {
    const cart = JSON.parse(filecontent);
    if (err) {
      cb(null);
    } else {
      cb(cart);
    }
  });
}
};