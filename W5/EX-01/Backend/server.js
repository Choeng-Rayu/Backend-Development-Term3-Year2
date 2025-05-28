const express = require('express')
const app = express();
const cors = require('cors');
const PORT = 5000;
app.use(cors());
app.use(express.json());

const articles = [
        { id: 1, title: 'hello', content: 'Content of Article 1', journalistId: 1, categoryId: 1 },
        { id: 2, title: 'hi', content: 'Content of Article 2', journalistId: 2, categoryId: 2 },
    ];

app.post('/articles', (req, res)=>{
    const {title, content, journalistId, categoryId} = req.body;
    if(!title || !content || !journalistId || !categoryId){
        return res.status(400).json({error: 'All fields are required'});
    }
    const newArticle = {
        id: articles.length ? articles[articles.length - 1].id + 1 : 1,
        title,
        content,
        journalistId,
        categoryId,
    }
    articles.push(newArticle);
    res.json(newArticle);
})

app.get('/articles/:id', (req,res) =>{
    const articleID = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleID);
    if(!article) return res.status(404).json({error: 'Article not found'});
    res.json(article);

});

app.get('/articles', (req, res) =>{

    res.status(200).json(articles);
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})


