import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    }
},{ timestamps: true })

const Categories = mongoose.model('categories', CategorySchema);
export default Categories;