const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const app = express();

app.use((req)=>{
    const url = req.url;
    const method = req.method;
    console.log(`Recieved ${method} request for ${url}`);
       
    
});

app.get('/', (res)=>{
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('Welcome to the Home Page');
});

app.get('/contact', (res)=>{
    res.writeHead(200, {'Content-type': 'text/hmtl'});
    res.end(`
        <form method="post" action = "/contact">
        <input type="text" name="name" placeholder="Youe name"/>
        button type="submit">submit</button>
        </form>
    `);
    return res.end("Thank you for your submission");
        
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