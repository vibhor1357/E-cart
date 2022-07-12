// const products=[];
const { json } = require('body-parser');
const fs=require('fs');
const path=require('path');

const Cart = require('./cart');

const p=path.join(
    path.dirname(require.main.filename),
'data',
'products.json'
);

const getproductsfromfile =cb=>{
    fs.readFile(p,(err,filecontent)=>{
        if(err){
            cb([]);
        }
        else{
        cb(JSON.parse(filecontent));
        }
    });
}

module.exports = class Product{
    constructor(id,title,imageurl,description,price){
        this.id=id;
        this.title=title;
        this.imageurl=imageurl;
        this.description=description;
        this.price=price;
        
        
    }




    save(){
        
       
        
        // products.push(this);
        // const p=path.join(
        //     path.dirname(require.main.filename),
        // 'data',
        // 'products.json'
        // );
        getproductsfromfile(products=>{
           
            if(this.id){
            const existingproductindex = products.findIndex(
            prod => prod.id===this.id
            );
            const updatedproducts = [...products];
            updatedproducts[existingproductindex] = this;
            fs.writeFile(p, JSON.stringify(updatedproducts),err=>{
                console.log(err);
                });
            } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products),err=>{
                console.log(err);
                });
            }
           
        });
    }

    static deletebyid(id){
        getproductsfromfile(products =>{
            const product = products.find(prod => prod.id===id);
            const updatedproducts= products.filter(prod => prod.id !== id);
           fs.writeFile(p,JSON.stringify(updatedproducts),err =>{
               if(!err){
                   Cart.deleteproduct(id,product.price);

               }
             
           });
        });

    }

        // fs.readFile(p,(err,filecontent)=>{
        //     let products = [];
        //     if(!err){
        //         products = JSON.parse(filecontent);
        //     }
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products),(err)=>{
        //     console.log(err);
        //     });
        // });
        // fs.readFile(p,(err,filecontent)=>{});
     static fetchAll(cb) {
        //  fs.readFile(p,(err,filecontent)=>{
        //      if(err){
        //          cb([]);
        //      }
        //      cb(JSON.parse(filecontent));
        //  });
        getproductsfromfile(cb);
     }
     static findById(id,cb){
         getproductsfromfile(products =>{
             const product = products.find(p => p.id === id);
             cb(product);
         });
     }

};