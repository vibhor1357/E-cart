const path = require('path');

const express = require('express');


// const rootdir = require('../util/path');
// const { mainModule } = require('process');
const admincontroller = require('../controllers/admin'); 


const router = express.Router();

// const products=[];



// /admin/add-product =>GET
router.get('/add-product', admincontroller.getaddproduct);
// (req,resp,next)=>{
    // console.log("In the another middleware");
    // resp.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="Submit">Add Product</button></form>')
    // resp.sendFile(path.join(__dirname,'../','views','add-product.html'));
    // resp.sendFile(path.join(rootdir,'views','add-product.html'));

//     resp.render('add-product',{
//         pagetitle:'Add Product',
//         path:'/admin/add-product',
//         activeAddproduct:true
//     });
// });

// /admin/products =>GET
router.get('/products',admincontroller.getproducts)

// /admin/add-product =>POST
router.post('/add-product', admincontroller.postaddproduct);
// (req,resp,next)=>{
//     // console.log(req.body);
//     products.push({title:req.body.title})
//     resp.redirect('/');

// });


router.get('/edit-product/:productid',admincontroller.geteditproduct);

router.post('/edit-product',admincontroller.posteditproduct);

router.post('/delete-product',admincontroller.postdeleteproduct);

// module.exports = router;

// exports.routes=router;
// exports.products=products;
module.exports=router;