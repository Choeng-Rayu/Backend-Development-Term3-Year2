const express = require('express');
const app = express();
app.get('/', (req, res)=>{
    res.send('Welcome to the Home Page');
});
app.listen(3000, (req, res)=>{
    console.log('Server is running at http://localhost:3000');
});
app.post('/contact', (req, res)=>{
    res.send('Form submitted');
});

app.use(express.urlencoded({extended: true}));
app.get('/contact', (req, res)=>{
    res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
});
app.use(express.json());
app.post ('/user' ,  (req, res)=>{
    console.log(req.body);
    res.send('form submitted');
});


function logger(req, res, next){
    console.log(`[${new Date().toISOString()}]${req.method} ${req.url}`);
    next();
}
app.use(logger);
app.get('/hello', (req, res)=>{
    res.send('Welcome to the Home Page');
});
app.listen(3000, (req, res)=>{
    console.log('Server is running at http://localhost:3000');
});