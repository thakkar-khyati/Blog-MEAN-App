const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require("dotenv")

const mongoose = require('./db')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

dotenv.config()
const app = express()

app.use(bodyParser.json())

const whitelist = process.env.whitelist

const allowedUrl = {
    origin: function(origin,callback){
        if(whitelist.includes(origin)){
            callback(null,true)
        }
        else{
            callback(new Error('Url not allowed by cors'))
        }
    }
}

app.use(cors(allowedUrl))

app.listen(process.env.port || 3001,()=>{
    console.log('server running on 3000')
})

app.use('/images', express.static(path.join('images')))
app.use('/user',userRoutes)
app.use('/blog',blogRoutes)