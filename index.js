import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { register , login } from './controllers/users.controllers.js'
import { posts ,  updatePost } from './controllers/post.controllers.js'
import authMiddleware from './middlewares/auth.middlewares.js'

dotenv.config()

const app = express()

app.use(express.json())
app.get('/user/')

//MONGO_DB .evn : 
await mongoose.connect(process.env.MONGO_DB)
console.log('database connected')

app.post('/register', register)
app.post('/login' , login )

app.use(authMiddleware.authentication)


app.post("/posts", posts);
app.put("/posts/:id", updatePost)


app.listen(process.env.PORT, () => {
    console.log('server is running!');
})