import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getUserData(id:string):Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user/'+id)
  }

  loginUser(email:string,password:string){
    const user = {
      email, password
    }
    return this.http.post('http://localhost:3000/user/login',user)
  }

  postUser(name:string, email:string, mNumber:string, role:string, password:string, avatar:string):void{
    const userform= new FormData()
    userform.append('name',name)
    userform.append('email',email)
    userform.append('mNumber',mNumber)
    userform.append('role',role)
    userform.append('password',password)
    userform.append('avatar',avatar,name)
    this.http.post('http://localhost:3000/user',userform).subscribe({
      next:(res)=>{
        console.log('user added')
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:3000/user/'+id)
  }

  updateUser(name:string, email:string, mNumber:string, role:string, password:string, avatar:string,id:string){
    const userform = new FormData()
    userform.append('name',name)
    userform.append('email',email)
    userform.append('mNumber',mNumber)
    userform.append('role',role)
    userform.append('password',password)
    userform.append('avatar',avatar,name)

    this.http.put('http://localhost:3000/user/'+id,userform).subscribe({
      next:(res)=>{
        console.log(`${name}'s data updated`)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

}