import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/categoriesController.js";

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;