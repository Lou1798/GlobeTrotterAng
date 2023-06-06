import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export class User {
  'username': string;
  'firstname': string;
  'lastname': string;
  'password': string;
} 

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = 'http://localhost:8000/api/';
  
  constructor( private http: HttpClient, private router:Router, private jwtHelper:JwtHelperService ) { }

  loginUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.username;
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.user_id;
  }

  signupUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', user);
  }

}


