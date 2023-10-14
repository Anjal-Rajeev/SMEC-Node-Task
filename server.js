import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db.js'
import articleRoutes from './routes/articleRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/article', articleRoutes)
app.use('/api/category', categoryRoutes)

const __dirname=path.resolve()
app.use("/images",express.static(path.join(__dirname,"/images")))



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`---------------Server is running on PORT: ${PORT}-------------------`);
    connectDB()
})
