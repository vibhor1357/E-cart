const Product =require('../models/product');

exports.getaddproduct = (req,resp,next)=>{
    resp.render('admin/edit-product',{
        pagetitle:'Add Product',
        path:'/admin/add-product',
        // activeAddproduct:true,
        editing:false
    });
};


exports.postaddproduct = (req,resp,next)=>{
    // products.push({title:req.body.title});
    const title = req.body.title;
    const imageurl = req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title,imageurl,description,price);
    product.save();
    resp.redirect('/');

};

exports.geteditproduct = (req,resp,next)=>{
    const editmode = req.query.edit;
    if(!editmode){
      return resp.redirect('/');
    }
    const prodid = req.params.productid;
    Product.findById(prodid,product =>{
        if(!product){
            return resp.redirect('/');
        }
        resp.render('admin/edit-product',{
            pagetitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editmode,
            product:product
        });
    });
  
};

exports.posteditproduct = (req,resp,next) =>{
  const prodid = req.body.productid;
  const updatedtitle = req.body.title;
  const updatedprice = req.body.price;
  const updatedimageurl = req.body.imageurl;
  const updateddescription = req.body.description;
  const updatedproduct = new Product(
    prodid,
    updatedtitle,
    updatedimageurl,
    updateddescription,
    updatedprice
    );
    updatedproduct.save();
    resp.redirect('/admin/products');
};

exports.getproducts = (req,resp,next) =>{
    Product.fetchAll((products)=>{
        resp.render('admin/products',{
            prods:products,
            pagetitle:'Admin Products',
            path:'/admin/products'
           
      }); 
    });
};

exports.postdeleteproduct = (req,resp,next) =>{
    const prodid = req.body.productid;
    Product.deletebyid(prodid);
    resp.redirect('/admin/products');

};