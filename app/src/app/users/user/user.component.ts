import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  _id!:string
  selected!:User

  admin = localStorage.getItem("admin")
  user = localStorage.getItem("user")

  constructor(private userApi:UserApiService, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['id'];
    this.getUser()
  }

  getUser(){
    this.userApi.getUserData(this._id).subscribe({
      next:(res:any)=>{
        this.selected = res
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  deleteUser(){
    this.userApi.deleteUser(this._id).subscribe({
      next:(res)=>{
        console.log(`${this.selected.name}'data deleted`)
      }
    })
  }
}
