const mongoose = require("mongoose")
const validator = require('validator')

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    title:{
        type:String,
        required:true,
    },
    summery:{
        required:true,
        type:String,
    },
    content:{
        required:true,
        type:String,
    },
    blogImg:{
        type:String
    },
},{
    timestamps:true,
})

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog