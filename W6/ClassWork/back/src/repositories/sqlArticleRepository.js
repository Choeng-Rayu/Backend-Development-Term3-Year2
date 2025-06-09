//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

 const mysql = require('mysql2/promise');
 const database = require('../database');
//  const pool = mysql.createPool({ ... });
 import {pool } from '../utils/database.js';

// Get all articles
export async function getArticles() {
    // TODO
    try{
        const [rows] = await pool.query('select * from airline_database2');
        return send.json(rows);
    }
    catch(err){
        console.error('Error fetching airlineDb:' , err);
    }
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
}

// Create a new article
export async function createArticle(article) {
    // TODO
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
}
