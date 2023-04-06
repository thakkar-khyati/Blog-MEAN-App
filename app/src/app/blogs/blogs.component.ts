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
  reload = localStorage.getItem('reload');

  page: number = 1;
  count: number = 0;
  tabelSize: number = 3;
  tabelSizes: any = [5, 10, 15, 20];

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllBlogs();
    if (this.reload) {
      localStorage.removeItem('reload');
      location.reload();
    }
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

  onCardDataChange(event: any) {
    this.page = event;

    window.scrollTo(0, 0);
    this.getAllBlogs();
  }
}
