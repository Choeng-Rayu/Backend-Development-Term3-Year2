//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import {pool} from "../utils/database.js";

// Get all articles
export async function getArticles() {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name 
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
        `);
        return rows;
    } catch(err) {
        console.error('Error fetching articles:', err);
        throw err;
    }
}

// Get one article by ID
export async function getArticleById(id) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch(err) {
        console.error('Error fetching article by ID:', err);
        throw err;
    }
}

// Create a new article
export async function createArticle(article) {
    try {
        // Map category to category_id if needed
        const category_id = article.category_id || article.category;
        console.log(`This is Category_id: ${category_id}\n`);
        const [result] = await pool.query(
            'INSERT INTO ARTICLES (title, content, journalist_id, category_id) VALUES (?, ?, ?, ?);',
            [article.title, article.content, article.journalist_id, category_id]
        );
        
        // Fetch and return the newly created article with category and journalist names
        const [newArticle] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [result.insertId]);
        
        return newArticle[0];
    } catch(err) {
        console.error('Error creating article:', err);
        throw err;
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    try {
        // // Map category to category_id if needed
        // if (updatedData.category && !updatedData.category_id) {
        //     updatedData.category_id = updatedData.category;
        //     delete updatedData.category;
        // }

        // // Create SET clause and values array
        // const setClause = Object.keys(updatedData).map(key => `${key} = ?`).join(', ');
        // const values = [...Object.values(updatedData), id];
        // console.log(`value of set clause: ${values}`);
        // console.log(`\nSetClause: ${setClause}\n`)
        console.log(updatedData)
        // Update the article
        const {title, content, journalist_id, category_id, id} = updatedData;
        const [result] = await pool.query(
            `UPDATE ARTICLES SET title = ?, content = ?, journalist_id = ?, category_id = ? WHERE id = ?`,
            [title, content, journalist_id, category_id, id]
        );
        
        // const [result] = await pool.query(
        //     `UPDATE ARTICLES SET title = '' WHERE id = ?`,
        //     values
        // );

        if (result.affectedRows === 0) {
            return null;
        }

        // Fetch and return the updated article with category and journalist names
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        
        return rows[0];
    } catch (err) {
        console.error('Error updating article:', err);
        throw err;
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    try {
        const [result] = await pool.query('DELETE FROM ARTICLES WHERE id = ?;', [id]);
        return result.affectedRows > 0;
    } catch(err) {
        console.error('Error deleting article:', err);
        throw err;
    }
}

// Get all articles with journalist name
export async function getArticlesWithJournalist() {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
        `);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err);
        throw err;
    }
}

// Get all articles by category ID (with category name)
export async function getArticlesByCategoryId(categoryId) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE c.category_id = ?
        `, [categoryId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by category ID:', err);
        throw err;
    }
}

// Get all categories
export async function getCategories() {
    try {
        const [rows] = await pool.query('SELECT category_id as id, name FROM Category ORDER BY name');
        return rows;
    } catch (err) {
        console.error('Error fetching categories:', err);
        throw err; // Re-throw the error to be handled by the controller
    }
}

// Get article by ID with journalist name
export async function getArticleWithJournalistById(id) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching article with journalist by ID:', err);
        throw err;
    }
}

// Get all articles by a specific journalist ID
export async function getArticlesByJournalistId(journalistId) {
    try {
        const [rows] = await pool.query(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM ARTICLES a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.journalist_id = ?
        `, [journalistId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by journalist ID:', err);
        throw err;
    }
}
