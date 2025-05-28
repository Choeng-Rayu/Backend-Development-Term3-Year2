import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());


const articles = [
    {
        id: 1,
        title: "Election Results 2025",
        content: "The final results of the 2025 elections are out...",
        journalistId: 1,
        categoryId: 1
    },
    {
        id: 2,
        title: "New Smartphone Breakthrough",
        content: "A revolutionary phone with foldable glass has been released...",
        journalistId: 2,
        categoryId: 2
    },
    {
        id: 3,
        title: "Champions League Highlights",
        content: "Here's what you missed in last night's Champions League game...",
        journalistId: 3,
        categoryId: 3
    },
    {
        id: 4,
        title: "Tech Giants Face Congress",
        content: "Major tech CEOs testify on regulation and privacy...",
        journalistId: 1,
        categoryId: 2
    },
    {
        id: 5,
        title: "Olympics 2028: Cities Shortlisted",
        content: "These are the cities that made the final cut...",
        journalistId: 3,
        categoryId: 3
    }
];

app.get('/articles', (req, res) =>{
    res.json(articles);
})

app.get('/articles/:id', (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Article not found' });
    }
});
app.post('/articles', (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;
    if(!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'All fields are required'});
    }
    const newArticle = { 
        id: articles.length ? articles[articles.length - 1].id + 1 : 1,
        title: title,
        content: content,
        journalistId: journalistId,
        categoryId: categoryId
    }
    articles.push(newArticle);
    res.status(201).json(newArticle);
    
});

app.put('/articles/:id', (req, res)=>{
    const articleID = parseInt(req.params.id);
    const {title, content, journalistId, categoryId} = req.body;
    if(!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const articleIndex = articles.findIndex(a => a.id === articleID);
    
    if(articleIndex === -1){
        return res.status(404).json({ error: 'Article not found'});
    }
    
    const updatedArticle = {
        id: articleID,
        title: title,
        content: content,
        journalistId: journalistId,
        categoryId: categoryId
    };
    
    articles[articleIndex] = updatedArticle;
    res.json(updatedArticle);
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
