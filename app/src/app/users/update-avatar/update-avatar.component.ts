import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css'],
})
export class UpdateAvatarComponent implements OnInit {
  id!: string;
  updateAvatarForm!: FormGroup;
  file!: any;

  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editAvatar: any,
    private formBuilder: FormBuilder,
    private userApi: UserApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateAvatarComponent>,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.updateAvatarForm = this.formBuilder.group({
      avatar: [null, Validators.required],
    });

    this.id = this.route.snapshot.params['id'];
  }

  updateAvatar() {
    this.userApi.updateAvatar(this.editAvatar._id, this.file, this.editAvatar.name).subscribe({
      next:(res)=>{
        this.openSnackBar(`${this.editAvatar.name}'s Avatar updated.`)
        this.dialogRef.close()
        // this.router.navigate(['/user/',this.editAvatar._id])
        location.reload()
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'end'
    })
  }
}
