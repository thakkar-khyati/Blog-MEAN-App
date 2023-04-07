import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Api/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  blogForm!: FormGroup;
  actionBtn: String = 'Save';
  file: any;

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<DialogComponent>,
    private fromBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editBlog: any
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fromBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      summery: ['', Validators.required],
      content: ['', Validators.required],
      blogImg: [null, Validators.required],
    });

    if (this.editBlog) {
      this.actionBtn = 'Update';
      console.log(this.editBlog);
      const fileUrl: File = this.file;
      this.blogForm.controls['name'].setValue(this.editBlog.name);
      this.blogForm.controls['email'].setValue(this.editBlog.email);
      this.blogForm.controls['title'].setValue(this.editBlog.title);
      this.blogForm.controls['summery'].setValue(this.editBlog.summery);
      this.blogForm.controls['content'].setValue(this.editBlog.content);
      this.blogForm.controls['blogImg'].setValue(fileUrl);
      console.log(this.blogForm);
    }
  }

  addBlog() {
    if (!this.editBlog) {
      if (this.blogForm.valid) {
        this.blogForm.value.blogImg = this.file;
        const data = this.blogForm.value;
        this.api.postBlog(
          data.name,
          data.email,
          data.title,
          data.summery,
          data.content,
          data.blogImg
        );
        this.openSnackBar(`${this.editBlog.title} added`);
        this.router.navigate(['/blog']);
        location.reload();
        this.blogForm.reset();
        this.dialogRef.close('save');
      }
    } else {
      this.updateBlog();
      this.openSnackBar(`${this.editBlog.title} updated`);
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

  updateBlog() {
    this.blogForm.value.blogImg = this.file;
    const data = this.blogForm.value;
    data.blogImg = this.file;
    data._id = this.editBlog._id;
    this.api.updateBlog(
      data.name,
      data.email,
      data.title,
      data.summery,
      data.content,
      data.blogImg,
      data._id
    );
    this.blogForm.reset();
    this.dialogRef.close('save');
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
