const Product =require('../models/product');
const Cart =require('../models/cart');

// exports.getaddproduct = (req,resp,next)=>{
//     resp.render('admin/add-product',{
//         pagetitle:'Add Product',
//         path:'/admin/add-product',
//         activeAddproduct:true
//     });
// }


// exports.postaddproduct = (req,resp,next)=>{
//     // products.push({title:req.body.title});
//     const product = new Product(req.body.title);
//     product.save();
//     resp.redirect('/');

// }


exports.getproducts = (req,resp,next)=>{
      Product.fetchAll((products)=>{
        resp.render('shop/product-list',{
            prods:products,
            pagetitle:'All Products',
            path:'/products'
            // hasproducts:products.length>0,
            // activeshop : true,
            // layout:false

      }); 
    // const products=admindata.products;
    
    });
};

exports.getproduct = (req,resp,next) =>{
const prodid=req.params.productid;
Product.findById(prodid,product =>{
//    console.log(product);
resp.render('shop/product-detail',{
    product:product,
    pagetitle:product.title,
    path:'/products'

});
});
// resp.redirect('/');
};

exports.getindex = (req,resp,next) =>{
    Product.fetchAll(products=>{
        resp.render('shop/index',{
            prods:products,
            pagetitle:'Shop',
            path:'/'
           
      }); 
    });
};

exports.getcart = (req,resp,next) =>{
    Cart.getcart(cart =>{
        Product.fetchAll(products =>{
            const cartproducts = [];
            for (product of products) {
              const cartproductdata = cart.products.find(
                prod => prod.id === product.id
              );
              if (cartproductdata) {
                cartproducts.push({ productdata: product, qty: cartproductdata.qty });
              }
            }
            resp.render('shop/cart',{
                path:'/cart',
                pagetitle:'Your Cart',
                products:cartproducts
            
            });

        });
    });


};

exports.postcart = (req,resp,next) =>{
    const prodid = req.body.productid;
    Product.findById(prodid,product =>{
    Cart.addproduct(prodid,product.price);
    });
    resp.redirect('/cart');
};

exports.postcartdeleteproduct = (req, resp, next) => {
    const prodid = req.body.productid;
    Product.findById(prodid, product => {
      Cart.deleteproduct(prodid, product.price);
      resp.redirect('/cart');
    });
  };

exports.getorders = (req,resp,next) =>{
    resp.render('shop/orders',{
        path:'/orders',
        pagetitle:'Your Orders'
    
    });
    
    };

exports.getcheckout = (req,resp,next) =>{
resp.render('shop/checkout',{
    path:'/checkout',
    pagetitle:'Checkout'
});
};