const data = require('../models/data.js');
const { categories } = data;    // import data from data.js

const getAllCategories = (req, res) =>{
    res.json(categories);
}

const getCategoryById = (req, res) =>{
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c =>c.id === categoryId);
    if(!category) return res.status(404).json({error: 'Category not found'});
    res.json(category);
}

const createCategory = (req, res) =>{
    const { name } = req.body;
    if(!name){
        return res.status(400).json({ error: 'Name is required'});
    }
    const newCategory = {
        id: categories.length ? categories[categories.length - 1].id + 1: 1, name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
}

const updateCategory = (req, res) =>{
    const categoryId = parseInt(req.params.id);
    const {name} = req.body;
    const category = categories.find(c => c.id === categoryId);
    if(!category) return res.status(404).json({error: 'Category not found'});
    if(name) category.name = name;
    res.json(category);
}

const deleteCategory = (req, res) =>{
    const categoryId = parseInt(req.params.id);
    const {name} = req.body;
    const index = categories.findIndex(c =>c.id = categoryId);
    if(index === -1) return res.status(404).json({error: 'Categories not found'});
    categories.splice(index, 1);
    res.status(204).send();
}

module.exports+{
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
