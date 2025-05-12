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
app.post('/submit' , (req, res)=>{
    res.send('form submitted');
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