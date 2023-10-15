import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    readTime: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    newest: {
        type: Boolean,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },

},{ timestamps: true })

const Article = mongoose.model('Article', ArticleSchema);
export default Article;