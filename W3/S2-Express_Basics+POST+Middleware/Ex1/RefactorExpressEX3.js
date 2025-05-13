const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({extended: true}));

function logger(req,res,next){
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
app.use(logger);
app.get('/', (req, res)=>{
        // res.writeHead(200, {'Content-type': 'text/html'});
        // res.end('Welcome to the Home Page');
        res.send(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
});

app.get('/contact', (req, res)=>{
    // res.writeHead(200, {'Content-type': 'text/hmtl'});
    res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
        
});
app.post('/contact', (req, res)=>{
    const name = req.body.name;
    console.log('Recieved name: ', name);

    fs.appendFile('submissions.txt', name + '\n', (err)=>{
        if(err){
            console.error('Error writing to file', err);
            return res.status(500).send('internal server error');
        }
        res.send(`<h1>Thank you ${name} for your submission</h1>`);
    });

});
app.listen(3000, (req,res)=>{
    console.log('Server is running at http://localhost:3000');
})