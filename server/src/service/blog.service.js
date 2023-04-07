const Blog = require("../model/blog");
const fs = require("fs")

const getAllBlog = async (req, res) => {
  try {
    let blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

const getBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(400).send("blog not found");
    }
    res.send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

const createBlog = (req, res) => {
  try {
    imagePath = "http://localhost:3000/images/" + req.file.filename;
    let blog = new Blog({
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      summery: req.body.summery,
      content: req.body.content,
      blogImg: imagePath,
    });
    blog.save();
    res.send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

const updateBlog = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(400).send("blog not found");
    }
    blog.blogImg = "http://localhost:3000/images/" + req.file.filename;
    updates.forEach((update) => {
      blog[update] = req.body[update];
    });

    await blog.save();
    res.send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

const deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      console.log('Blog not Found')
      return res.status(400).send("blog not found");
    }
    const filename = blog.blogImg.replace("http://localhost:3000/images/","");
    const directoryPath = "/home/aspire001/node/Blog-mean/server/images/";
    const path = directoryPath+filename
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    
    res.send(blog);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

module.exports = {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
