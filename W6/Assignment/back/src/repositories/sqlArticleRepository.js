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
        console.log(article);
        const [rows] = await pool.query('INSERT INTO ARTICLES (title, content, journalist_id, category) values (?, ?, ?, ?);', [article.title, article.content, article.journalist_id, article.category]);
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

// Get all articles with journalist name
export async function getArticlesWithJournalist() {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, j.name as journalist_name
            FROM ARTICLES a
            JOIN journalists j ON a.journalist_id = j.journalist_id
        `);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err);
    }
}

// Get all articles by a specific journalist name
export async function getArticlesByJournalistName(journalistName) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, j.name as journalist_name
            FROM ARTICLES a
            JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE j.name = ?
        `, [journalistName]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by journalist name:', err);
    }
}

// Get all articles by a specific journalist ID
export async function getArticlesByJournalistId(journalistId) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, j.name as journalist_name
            FROM ARTICLES a
            JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE j.journalist_id = ?
        `, [journalistId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by journalist ID:', err);
    }
}

// Get article by ID with journalist name
export async function getArticleWithJournalistById(id) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, j.name as journalist_name
            FROM ARTICLES a
            JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching article with journalist by ID:', err);
    }
}

// Get all categories
export async function getCategories() {
    try {
        const [rows] = await pool.query('SELECT * FROM Category;');
        return rows;
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

// Get all articles by category ID (with category name)
export async function getArticlesByCategoryId(categoryId) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            JOIN Category c ON a.category = c.id
            JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE c.id = ?
        `, [categoryId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by category ID:', err);
    }
}
