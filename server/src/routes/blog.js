const express = require("express");
const Blog = require("../model/blog");
const multer = require("multer")
const sharp = require('sharp')
const router = express.Router();

const storage = require('../middleware/storage')

//get all blogs
router.get("/", async (req, res) => {
  try {
    let blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    res.status(500).send();
  }
});

//get blog by id
router.get("/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).send();
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send();
  }
});

//create blog
router.post("/",storage, (req, res) => {
  try {
    imagePath = 'http://localhost:3000/images/'+req.file.filename
    let blog = new Blog({
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      summery:req.body.summery,
      content: req.body.content,
      blogImg: imagePath
    });
    blog.save();
    res.send(blog);
  } catch (error) {
    res.status(500).send();
  }
});

//delete blog by id
router.delete("/:id", async (req, res) => {
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(400).send();
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send();
  }
});

//update blog
router.put("/:id",storage, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    let blog = await Blog.findOne({_id:req.params.id})
    if (!blog) {
      return res.status(400).send();
    }
    updates.forEach((update)=>{
      if(update === 'blogImg'){
        blog.blogImg = 'http://localhost:3000/images/'+req.file.filename
      }
      else{
        blog[update] = req.body[update]
      }
      
    })
   
    blog.save();
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
