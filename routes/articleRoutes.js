import express from 'express'
const router = express.Router()
import {createArticle, deleteArticle, getArticles, getArticlesByCategory, updateArticles} from '../controllers/articleController.js'
import multer from 'multer'

// create multer storage----------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

// multer upload instance
const upload = multer({ storage: storage })


// API to create an Article
router.post('/', upload.single('image'), createArticle)


// API to update an Article
router.put('/:id',upload.single('image'), updateArticles)


// API to delete an Article
router.delete('/:id', deleteArticle)


// API to list all Articles
router.get('/', getArticles)


// API to list Articles based on categories
router.get('/category', getArticlesByCategory)





export default router