//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import {pool} from "../utils/database.js";


// Get all articles
export async function getArticles() {
    // TODO
    try{
        const [rows] = await pool.query('SELECT * FROM ARTICLES;');
        return rows;
    }catch(err){
        console.error('Error fetching articles:', err);
    }
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    try{
        const [rows] = await pool.query('SELECT * FROM ARTICLES WHERE id = ?', [id]);
        return rows[0];
    }catch(err){
        console.error('Error fetching article by ID:', err);
    }
}

// Create a new article
export async function createArticle(article) {
    // TODO
    try{
        const [rows] = await pool.query('INSERT INTO ARTICLES (title, content, journalist, category) values (?, ?, ?, ?);', [article.title, article.content, article.journalist, article.category]);
        return rows;
    }catch(err){
        console.error('Error creating articls: ', err);
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    try{
        const [rows] = await pool.query('UPDATE ARTICLES SET ? WHERE id = ?;', [updatedData, id]);
        return rows;
    }catch(err){
        console.error('Error updating article: ', err);
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    try {
        const [rows] = await pool.query('DELETE FROM ARTICLES WHERE id = ?;', [id]);
        return rows;
    }catch(err){
        console.error('Error deleting article: ', err);
    }
}
