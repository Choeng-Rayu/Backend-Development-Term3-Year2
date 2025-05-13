




const express = require('express');
const app = express();


app.use((req, res)=>{
    // console.log(`Recieved a reqest from ${url}`);
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    switch (req.url){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(
                `<html>
                    <head><title>Home</title></head>
                    <body>
                        <h1>Welcome to the Home Page</h1>
                        <p>This is a simple Node.js server.</p>
                    </body>
                </html>`
            );
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About us: at CDATASection, we love Node.js!');
            break;
        case '/contact-us':
                res.writeHead(200, {'Content-Type': 'Text/plain'});
                res.end ('You can reach us via email!');
            break;
        case '/products':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Buy one get one');
            break;
        case '/projects':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Here are our awesome projects');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page not found');
    }

});
app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
});





















//Another way to do it
// const express = require('express');
// const app = express();

// // Middleware for handling all routes
// app.use((req, res) => {
//     switch (req.url) {
//         case '/':
//             res.send(`
//                 <html>
//                     <head><title>Home</title></head>
//                     <body>
//                         <h1>Welcome to the Home Page</h1>
//                         <p>This is a simple Node.js server.</p>
//                     </body>
//                 </html>
//             `);
//             break;
        
//         case '/about':
//             res.send('About us: at CDATASection, we love Node.js!');
//             break;
            
//         case '/contact-us':
//             res.send('You can reach us via email!');
//             break;
            
//         case '/products':
//             res.send('Buy one get one');
//             break;
            
//         case '/projects':
//             res.send('Here are our awesome projects');
//             break;
            
//         default:
//             res.status(404).send('Page not found');
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });






