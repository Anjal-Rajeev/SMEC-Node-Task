import Categories from "../models/categoryModel.js";


// Function to create category
export const createCategory = async (req, res) => {
    try {

        let newCategory = new Categories(req.body)

        let saveCategory = await newCategory.save()

        res.status(200).json({
            success: true,
            message: 'Category created.',
            data: saveCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}


// Function to list all categories
export const getCategories = async (req, res) => {
    try {

        let sort = { $sort: { createdAt: -1 } }

        let project = {
            $project: {
                __v: 0,
                updatedAt: 0
            }
        }

        let data = await Categories.aggregate([sort, project])

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
                message: 'Category not found.',
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