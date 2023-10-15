import express from 'express'
const router = express.Router()
import {createCategory, getCategories} from '../controllers/categoryController.js'



// API to create category
router.post('/', createCategory)



// API to list all Categories
router.get('/', getCategories)



export default router