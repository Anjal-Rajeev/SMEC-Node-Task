import { ObjectId } from "mongodb";
import Article from "../models/articleModel.js";


// Function to create article
export const createArticle = async (req, res) => {
    try {
        console.log(req.file);
        req.body.image = req.file.filename
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
        console.log(req.params.id)
        let id = req.params.id
        let data = await Article.findById(id)
        console.log(data);

        if (data) {

            if (req.file) {
                req.body.image = req.file.filename
            }
            let updatedData = await Article.findByIdAndUpdate(id, { $set: req.body }, { new: true })

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

        console.log(req.params.id)
        let id = req.params.id

        let data = await Article.findById(id)
        console.log(data);

        if(data){
            let deleteData = await Article.findByIdAndDelete(id)
            console.log(deleteData);

            res.status(200).json({
                success: true,
                message: 'Successfull.',
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

