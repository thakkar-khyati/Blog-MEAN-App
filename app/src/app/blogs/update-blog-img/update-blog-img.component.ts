import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Api/api.service';

@Component({
  selector: 'app-update-blog-img',
  templateUrl: './update-blog-img.component.html',
  styleUrls: ['./update-blog-img.component.css'],
})
export class UpdateBlogImgComponent implements OnInit {
  UpdateBlogImg!: FormGroup;
  file: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editBlog: any,
    private dialogRef: MatDialogRef<UpdateBlogImgComponent>,
    private router:Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.UpdateBlogImg = this.formBuilder.group({
      blogImg: [null, Validators.required],
    });
  }

  update() {
    this.api
      .updateBlogImg(this.editBlog._id, this.file, this.editBlog.title)
      .subscribe({
        next: (res) => {
          this.dialogRef.close()
          this.router.navigate(['/selectedBlog/',this.editBlog._id])
          this.openSnackBar(`${this.editBlog.title}'s Blog Image updated`)
          location.reload()
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:2000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }
}
