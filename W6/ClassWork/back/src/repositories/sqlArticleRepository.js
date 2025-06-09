//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import mysql from 'mysql2/promise';
// const database = require('../database'); // Not needed in ES module, use import instead
//  const pool = mysql.createPool({ ... });
 import {pool } from '../utils/database.js';

// Get all articles
export async function getArticles() {
    // TODO
    try{
        const [rows] = await pool.query('select * from airlines;');
        // return send.json(rows);
        return rows;
    }
    catch(err){
        console.error('Error fetching airlineDb:' , err);
    }
}

// Get one article by ID
export async function getArticleById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM airlines WHERE id = ?', [id]);
        return rows[0]; // Return the first (and only) matching article
    } catch (err) {
        console.error('Error fetching article by ID:', err);
        throw err;
    }
}

// Create a new article
export async function createArticle(article) {
    // TODO
    try{
        const [result] = await pool.query('INSERT INTO AIRLINES values (AirlineID, Name, Country)')
    }catch(err){
        console.error('Error creating article:', err);
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
}
