const fs= require('fs');

const requesthandler = (req,resp) =>{

    const url=req.url;
    const method=req.method;

    if (url === '/'){
        resp.write('<html>');
        resp.write('<head><title>Messasge</title></head>');
        resp.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        resp.write('</html');
         return resp.end();
    }
    
    if(url ==='/message'&& method ==='POST'){
      const body = [];
      req.on('data',(chunk)=>{
        console.log(chunk);
       body.push(chunk);
      });
      // req.on('end',()=>{
      //   const parsedbody=Buffer.concat(body).toString();
      //   const message=parsedbody.split('=')[1];
      //   fs.writeFileSync('message.txt',message);
      // });
      
     
    //   resp.statusCode=302;
    //   resp.setHeader('Location','/');
    //   return resp.end();
    // }
    req.on('end',()=>{
      const parsedbody=Buffer.concat(body).toString();
      const message=parsedbody.split('=')[1];
      fs.writeFile('message.txt',message, err =>{
        resp.statusCode=302;
        resp.setHeader('Location','/');
        return resp.end();
      
      });
    });
    }
    
    resp.setHeader('Content-Type','text/html');
    resp.write('<html>');
    resp.write('<head><title>My First Webpage</title></head>');
    resp.write('<body><h1>Hello from my Node-js Server!</body>')
    resp.write('</html');
    resp.end();
};

// module.exports = requesthandler;

// module.exports = {
//  handler: requesthandler,
//  sometext: 'Some hard coded Text'
// };

// module.exports.handler = requesthandler;
// module.exports.sometext = 'Some hard coded Text';

exports.handler = requesthandler;
exports.sometext = 'Some hard coded Text';





// if (url === '/'){
//     resp.write('<html>');
//     resp.write('<head><title>Messasge</title></head>');
//     resp.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
//     resp.write('</html');
//      return resp.end();
// }

// if(url ==='/message'&& method ==='POST'){
//   const body = [];
//   req.on('data',(chunk)=>{
//     console.log(chunk);
//    body.push(chunk);
//   });
//   // req.on('end',()=>{
//   //   const parsedbody=Buffer.concat(body).toString();
//   //   const message=parsedbody.split('=')[1];
//   //   fs.writeFileSync('message.txt',message);
//   // });
  
 
// //   resp.statusCode=302;
// //   resp.setHeader('Location','/');
// //   return resp.end();
// // }
// req.on('end',()=>{
//   const parsedbody=Buffer.concat(body).toString();
//   const message=parsedbody.split('=')[1];
//   fs.writeFile('message.txt',message, err =>{
//     resp.statusCode=302;
//     resp.setHeader('Location','/');
//     return resp.end();
//   });
// });
// }

// resp.setHeader('Content-Type','text/html');
// resp.write('<html>');
// resp.write('<head><title>My First Webpage</title></head>');
// resp.write('<body><h1>Hello from my Node-js Server!</body>')
// resp.write('</html');
// resp.end();
