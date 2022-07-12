const path = require('path');

const express = require('express');


// const rootdir = require('../util/path');

// const admindata = require('./admin')
const shopcontroller = require('../controllers/shop');

const router = express.Router();

router.get('/', shopcontroller.getindex);
// (req,resp,next)=>{
//     // console.log("In the another middleware");
//     // resp.send('<h1>Hello from Express!</h1>')
//     // resp.sendFile(path.join(__dirname,'../','views','shop.html'));

//     // console.log('shop.js',admindata.products);
//     // resp.sendFile(path.join(rootdir,'views','shop.html'));
//     const products=admindata.products;
//     resp.render('shop',{
//         prods:products,
//         pagetitle:'Shop',
//         path:'/',
//         hasproducts:products.length>0,
//         activeshop : true,
//         layout:false
//     });
// });

router.get('/products',shopcontroller.getproducts);

router.get('/products/:productid',shopcontroller.getproduct);

router.get('/cart',shopcontroller.getcart);

router.post('/cart',shopcontroller.postcart);

router.post('/cart-delete-item',shopcontroller.postcartdeleteproduct);

router.get('/orders',shopcontroller.getorders);

router.get('/checkout',shopcontroller.getcheckout);

module.exports = router;
