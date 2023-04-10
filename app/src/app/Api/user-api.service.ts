import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {


  constructor(private http:HttpClient, private router: Router) { }

  getUser():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getUserData(id:string):Observable<User>{
    return this.http.get<User>('http://localhost:3000/user/'+id)
  }

  loginUser(email:string,password:string){
    const user = {
      email, password
    }
    return this.http.post('http://localhost:3000/user/login',user)
  }

  postUser(name:string, email:string, mNumber:string, role:string, password:string,address:string,Dob:any,hobbies:string, avatar:any):void{
    const userform= new FormData()
    userform.append('name',name)
    userform.append('email',email)
    userform.append('mNumber',mNumber)
    userform.append('role',role)
    userform.append('password',password)
    userform.append('address',address)
    userform.append('Dob',Dob)
    userform.append('hobbies',hobbies)
    userform.append('avatar',avatar,name)
    this.http.post('http://localhost:3000/user',userform).subscribe({
      next:(res)=>{
        console.log('user added')
      },
      error:(e)=>{
        console.log(e)
        this.router.navigate(['/signup'])
      }
    })
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:3000/user/'+id)
  }

  updateUser(user:User){

    return this.http.patch('http://localhost:3000/user/'+user._id,user).subscribe({
      next:(res)=>{
        console.log(`${user.name}'s data updated`)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  updateAvatar(id:string,avatar:any, name:string){
    const updateAvatar = new FormData()
    updateAvatar.append('avatar',avatar,name)
    return this.http.patch("http://localhost:3000/user/avatar/"+id,updateAvatar)
  }

}
