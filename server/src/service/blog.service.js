const Blog = require("../model/blog");
const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()

const utill = require("../utill.js")

const getAllBlog = async (req, res) => {
  try {
    let blogs = await Blog.find({});
    res.status(utill.status.success).send(blogs);
  } catch (error) {
    console.log('can not connect with server')
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const getBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    res.status(utill.status.success).send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const createBlog = (req, res) => {
  try {
    imagePath = process.env.imageURL + req.file.filename;
    let blog = new Blog({
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      summery: req.body.summery,
      content: req.body.content,
      blogImg: imagePath,
    });
    blog.save();
    res.status(utill.status.success).send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const updateBlog = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    //blog.blogImg = "http://localhost:3000/images/" + req.file.filename;
    updates.forEach((update) => {
      blog[update] = req.body[update];
    });

    await blog.save();
    res.status(utill.status.success).send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const updateBlogImg= async (req,res)=>{
  try {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
      console.log('Blog not Found')
      res.status(utill.status.badRequest).send(utill.message.badRequest)
    }
    blog.blogImg = process.env.imageURL +req.file.filename;
    await blog.save()
    res.status(utill.status.success).send(blog)
  } catch (error) {
    console.log('can not connect to server')
    res.status(utill.status.serverError).send(utill.message.serverError)
  }
}

const deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    const filename = blog.blogImg.replace(process.env.imageURL ,"");
    const directoryPath = process.env.imagePath;
    const path = directoryPath+filename
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    
    res.status(utill.status.success).send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

module.exports = {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  updateBlogImg,
  deleteBlog,
};
