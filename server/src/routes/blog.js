const express = require("express");
const Blog = require("../model/blog");
const {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  updateBlogImg,
  deleteBlog
} = require("../service/blog.service");
const router = express.Router();

const storage = require("../middleware/storage");
const auth = require("../middleware/auth");

//get all blogs
router.get("/", getAllBlog);

//get blog by id
router.get("/:id", getBlog);

//create blog
router.post("/", [auth,storage], createBlog);

//delete blog by id
router.delete("/:id",auth, deleteBlog);

//update blog
router.patch("/:id",auth,updateBlog);

//update blog image
router.patch('/blogImg/:id',[auth,storage],updateBlogImg);

module.exports = router;
