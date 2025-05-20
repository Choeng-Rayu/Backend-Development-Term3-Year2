import { articles } from '../models/data.js';
// const data = required('../models/data.js');

const getAllArticles = (req, res)=>{
    res.json(articles);
}

const getArticleById = (req, res) =>{
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);
    if(!article) return res.status(404).json({error: 'Articles not found'});
    res.json(article);
}

const createArticle =  (req, res) =>{
    const {title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({error: 'Title and content are required'});
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
    
}

const updateArticle = (req, res) =>{
    const articleId = parseInt(req.params.id);
    const {title, content, journalistId, categoryId} = req.body;
    const articles = articles.find(a => a.articleId === articleId);
    if(!title || !content || !journalistId ||  !categoryId) return res.status(404).json({error: 'Articles not found'});
    if(title) articles.title = title;
    if(content) articles.content = content;
    if(journalistId) articles.journalistId.journalistId;
    if(categoryId) articles.categoryId = categoryId;
    res.json(articles);
}

const deleteArticle = (req, res) =>{
    const articleId = parseInt(req.params.id);
    const index = articles.find(a => a.articleId === articleId);
    if(index === -1) res.status(404).json({error: 'Articles not found'});
    articles.splice(indexedDB, 1);
    res.status(204).send();
}
export {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}