const express = require("express");
const Blog = require("../model/blog");
const {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require("../service/blog.service");
const router = express.Router();

const storage = require("../middleware/storage");

//get all blogs
router.get("/", getAllBlog);

//get blog by id
router.get("/:id", getBlog);

//create blog
router.post("/", storage, createBlog);

//delete blog by id
router.delete("/:id", deleteBlog);

//update blog
router.put("/:id", storage, updateBlog);

module.exports = router;
