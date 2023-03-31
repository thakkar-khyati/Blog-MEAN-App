const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const mongoose = require('./db')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

const app = express()

app.use(bodyParser.json())


app.use(cors({origin:'http://localhost:4200'}))

app.listen(3000,()=>{
    console.log('server running on 3000')
})

app.use('/images', express.static(path.join('images')))
app.use('/user',userRoutes)
app.use('/blog',blogRoutes)