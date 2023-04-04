import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { Blog } from '../Models/blog.model';
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
        
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
