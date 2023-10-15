import { ObjectId } from "mongodb";
import Article from "../models/articleModel.js";


// Function to create article
export const createArticle = async (req, res) => {
    try {

        req.body.image = req.file.filename
        req.body.categories = req.body.categories.split(',')        //Spliting to store categories as array
        let newArticle = new Article(req.body)

        let saveArticle = await newArticle.save()

        res.status(200).json({
            success: true,
            message: 'Article created.',
            data: saveArticle
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}


// Function to list all articles
export const getArticles = async (req, res) => {
    try {

        let sort = { $sort: { createdAt: -1 } }

        let project = {
            $project: {
                __v: 0,
                updatedAt: 0
            }
        }

        let data = await Article.aggregate([sort, project])

        if (data.length) {
            res.status(200).json({
                count: data.length,
                success: true,
                message: 'Successfull',
                data: data
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Articles not found.',
                count: 0,
                data: []
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}


// Function to update an article
export const updateArticles = async (req, res) => {
    try {

        let id = req.params.id
        let data = await Article.findById(id)
        req.body.categories = req.body.categories.split(',')

        if (data) {

            if (req.file) {
                req.body.image = req.file.filename
            }

            let match = {
                _id: id
            }

            let { categories, ...otherinfo } = req.body

            let update = {
                $set: { ...otherinfo },
                $addToSet: { categories: { $each: categories } }
            }

            let updatedData = await Article.findOneAndUpdate(match, update, { new: true })

            res.status(200).json({
                success: true,
                message: 'Successfull.',
                data: updatedData
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Articles not found.',
                data: []
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}


// Function to delete an article
export const deleteArticle = async (req, res) => {
    try {

        let id = req.params.id

        let data = await Article.findById(id)

        if (data) {
            let deleteData = await Article.findByIdAndDelete(id)
            console.log(deleteData);

            res.status(200).json({
                success: true,
                message: 'Successfull.',
                data: []
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Article not found.',
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}


// Function to list articles based on categories
export const getArticlesByCategory = async (req, res) => {
    try {
        let categoryName = req.query.categoryName.split(',')

        let match = {
            $match: { categories: { $in: categoryName } }
        }

        let sort = {$sort: { createdAt: -1}}

        let project = {
            $project: {
                updatedAt: 0,
                __v: 0
            }
        }

        let data = await Article.aggregate([match, sort, project])

        if (data.length) {
            res.status(200).json({
                success: true,
                message: 'Successfull.',
                count: data.length,
                data: data
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Article not found.',
                count: 0,
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

