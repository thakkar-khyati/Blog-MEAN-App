import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserApiService } from '../Api/user-api.service';

@Injectable()
export class TokenErrorInterceptor implements HttpInterceptor {
  constructor(private userapi: UserApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('error Event');
          } else {
            switch (error.status) {
              case 419:
                console.log('error 419');
                let token = localStorage.getItem('token');
                let refreshToken = localStorage.getItem('refreshToken');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                if (token && refreshToken) {
                  this.userapi.refreshToken(token, refreshToken)
                }
            }
          }
        } else {
          console.log('error occured');
        }
        return throwError(() => {
          new Error(error.statusText);
        });
      })
    );
  }
}
