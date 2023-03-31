import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Api/api.service';
import { Blog } from 'src/app/Models/blog.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogId!: string;
  selected!: Blog;

  admin = localStorage.getItem('admin')
  user = localStorage.getItem('user')

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.params['id'];
    this.getBlogData();
  }

  getBlogData() {
    this.api.getBlogData(this.blogId).subscribe({
      next: (res) => {
        this.selected = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteBlog() {
    this.api.deleteBlog(this.blogId).subscribe({
      next: (res) => {
        console.log('blog deleted');
        this.router.navigate(['/blog']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateBlog() {
    this.dialog
      .open(DialogComponent, {
        width: '80%',
        height: '80%',
        data: this.selected,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getBlogData();
        }
      });
  }
}
