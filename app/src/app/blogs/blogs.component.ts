import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { Blog } from '../Models/blog.model';
import { NgOptimizedImage } from '@angular/common'
import { ObjectId } from 'mongodb';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogdata: Blog[] = [];

  constructor(private api: ApiService,private http:HttpClient) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    return this.api.getBlog().subscribe({
      next: (res: Blog[]) => {
        this.blogdata = res;
        console.log(this.blogdata)
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // getBlogImages(blogs:Blog[]) {
    
  //   blogs.forEach((blog: any) => {
  //     return blog.imgUrl = `http://localhost:3000/blog/blogImg/`+blog._id
      
  //   });
  //   return blogs;

  // }
}
