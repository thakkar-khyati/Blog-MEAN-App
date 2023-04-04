import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../Models/blog.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private router:Router) { }
  
  //get all blogs api
  getBlog():Observable<Blog[]>{
    return this.http.get<Blog[]>('http://localhost:3000/blog')
  }

  //get blog by id
  getBlogData(id:string):Observable<Blog>{
    return this.http.get<Blog>('http://localhost:3000/blog/'+id)
  }

  //create blog
  postBlog(name:string, email:string, title:string, summery:string, content:string, image:File):void{
    const blogForm = new FormData()
    blogForm.append("name",name)
    blogForm.append("email",email)
    blogForm.append("title",title)
    blogForm.append("summery",summery)
    blogForm.append("content",content)
    blogForm.append("blogImg", image, title)
    this.http.post('http://localhost:3000/blog',blogForm).subscribe({
      next:(res)=>{
        console.log(res)
        console.log("blog added")
        this.router.navigate(['/blog'])
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
  
  //delete blog by id 
  deleteBlog(id:string){
    return this.http.delete('http://localhost:3000/blog/'+id)
  }

  updateBlog(name:string, email:string, title:string, summery:string, content:string, blogImg:
    File,id:string){
    const blogForm = new FormData()
    blogForm.append("name",name)
    blogForm.append("email",email)
    blogForm.append("title",title)
    blogForm.append("summery",summery)
    blogForm.append("content",content)
    blogForm.append("blogImg", blogImg, title)
    console.log("blogImg",blogImg)
    return this.http.put('http://localhost:3000/blog/'+id,blogForm).subscribe({
      next:(res)=>{
        console.log(res)
        console.log("profile updated")
        // this.router.navigate(['/selectedBlog'])
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
  
}
