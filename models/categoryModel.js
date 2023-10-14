import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    strCategoryName: {
        type: String,
        required: true,
    },
    strCategoryId: {
        type: String,
        required: true,
    }
})

const categories = mongoose.model('categories', CategorySchema);
module.exports = categories;