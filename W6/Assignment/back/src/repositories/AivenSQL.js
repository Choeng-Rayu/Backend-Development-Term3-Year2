//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import { getConnection } from '../utils/ConnectSQlWithAiven.js';

// Get all articles
export async function getArticles() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name 
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
        `);
        return rows;
    } catch(err) {
        console.error('Error fetching articles:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Get one article by ID
export async function getArticleById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch(err) {
        console.error('Error fetching article by ID:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Create a new article
export async function createArticle(article) {
    let connection;
    try {
        connection = await getConnection();
        const category_id = article.category_id || article.category;
        const [result] = await connection.execute(
            'INSERT INTO Articles (title, content, journalist_id, category_id) VALUES (?, ?, ?, ?);',
            [article.title, article.content, article.journalist_id, category_id]
        );
        const [newArticle] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [result.insertId]);
        return newArticle[0];
    } catch(err) {
        console.error('Error creating article:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    let connection;
    try {
        connection = await getConnection();
        const {title, content, journalist_id, category_id} = updatedData;
        const [result] = await connection.execute(
            `UPDATE Articles SET title = ?, content = ?, journalist_id = ?, category_id = ? WHERE id = ?`,
            [title, content, journalist_id, category_id, id]
        );
        if (result.affectedRows === 0) {
            return null;
        }
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error updating article:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.execute('DELETE FROM Articles WHERE id = ?;', [id]);
        return result.affectedRows > 0;
    } catch(err) {
        console.error('Error deleting article:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Get all articles with journalist name
export async function getArticlesWithJournalist() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
        `);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Get all articles by category ID (with category name)
export async function getArticlesByCategoryId(categoryId) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE c.category_id = ?
        `, [categoryId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by category ID:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Get all categories
export async function getCategories() {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute('SELECT category_id as id, name FROM Category ORDER BY name');
        return rows;
    } catch (err) {
        console.error('Error fetching categories:', err);
        throw err; // Re-throw the error to be handled by the controller
    } finally {
        if (connection) await connection.end();
    }
}

// Get article by ID with journalist name
export async function getArticleWithJournalistById(id) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching article with journalist by ID:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

// Get all articles by a specific journalist ID
export async function getArticlesByJournalistId(journalistId) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(`
            SELECT a.*, c.name as category_name, j.name as journalist_name
            FROM Articles a
            LEFT JOIN Category c ON a.category_id = c.category_id
            LEFT JOIN journalists j ON a.journalist_id = j.journalist_id
            WHERE a.journalist_id = ?
        `, [journalistId]);
        return rows;
    } catch (err) {
        console.error('Error fetching articles by journalist ID:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}
