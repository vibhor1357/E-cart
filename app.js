// To Create a Node Server

const path = require('path');


// const http = require('http');
const bodyparser = require('body-parser');


// const routes = require('./routes')
const errorcontroller = require('./controllers/error');

const express = require('express');
// const req = require('express/lib/request');
// const { nextTick } = require('process');

// const expresshbs = require('express-handlebars');

const app = express();

// app.use((req,resp,next)=>{
//       console.log("In the middleware");
//       next(); // allows the request to continue to the next middleware in line

// });

// app.use('/',(req,resp,next)=>{
//     console.log("This always runs");
//     next(); 
    
// });

// HANDLEBARS
// app.engine('hbs', expresshbs.engine({extname:'hbs',layoutsDir:'views/layouts/',defaultLayout:'main-layout'}));
// app.set('view engine','hbs');
// app.set('views','views');


//PUG
// app.set('view engine','pug');
// app.set('views','views');

// EJS
app.set('view engine','ejs');
app.set('views','views');


const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');             // Requests goes from TOP to Bottom


app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

// app.use(shoproutes);
app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(errorcontroller.get404);
    // (req,resp,next)=>{
// //  resp.status(404).send('<h1>Page Not Found</h1>')
// // resp.status(404).sendFile(path.join(__dirname,'views','404.html'));
// resp.status(404).render('404',{pagetitle:'Page Not Found'});
// });

// app.use('/add-product',(req,resp,next)=>{
//     // console.log("In the another middleware");
//     resp.send('<form action="/product" method="POST"><input type="text" name="title"><button type="Submit">Add Product</button></form>')
// });


// app.use('/product',(req,resp,next)=>{
//     console.log(req.body)
//     resp.redirect('/');

// });

// app.post('/product',(req,resp,next)=>{
//     console.log(req.body)
//     resp.redirect('/');

// })

// app.use('/',(req,resp,next)=>{
//     console.log("In the another middleware");
//     resp.send('<h1>Hello from Express!</h1>')
    
// });




// function rqListener(req,resp){   ---- 1 way

// }

// http.createServer(rqListener);

// -------2nd way

// http.createServer(function(req,resp){

// });

// -------3rd way

// http.createServer((req,resp)=>{
//     console.log(req);
// });



//  const server=http.createServer((req,resp)=>{
//     console.log(req);
// });

// server.listen(3000);

// const server=http.createServer((req,resp)=>{
//     // console.log(req.url,req.method,req.headers);
//     // process.exit();
//     // const url=req.url;
//     // const method=req.method;
  


// });
// const server=http.createServer(routes);

// console.log(routes.sometext);
// const server=http.createServer(routes.handler);

// const server=http.createServer(app);
// server.listen(3000);
app.listen(3000);