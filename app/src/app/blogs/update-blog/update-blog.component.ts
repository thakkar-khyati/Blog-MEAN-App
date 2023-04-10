import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Api/api.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css'],
})
export class UpdateBlogComponent implements OnInit {
  blogForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editBlog: any,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<UpdateBlogComponent>,
    private router:Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      summery: ['', Validators.required],
      content: ['', Validators.required],
    });

    if (this.editBlog) {
      console.log(this.editBlog);
      this.blogForm.controls['name'].setValue(this.editBlog.name);
      this.blogForm.controls['email'].setValue(this.editBlog.email);
      this.blogForm.controls['title'].setValue(this.editBlog.title);
      this.blogForm.controls['summery'].setValue(this.editBlog.summery);
      this.blogForm.controls['content'].setValue(this.editBlog.content);
      console.log(this.blogForm);
    }
  }

  updateBlog() {
    const data = this.blogForm.value;
    data._id = this.editBlog._id;
    this.api.updateBlog(data);
    this.dialogRef.close('update');
    this.openSnackBar(`${this.editBlog.name}'s data updated`)
    this.router.navigate(['/selectedBlog/',data._id])
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'end'
    })
  }
}
