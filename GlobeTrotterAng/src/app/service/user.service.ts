import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  //URL de base de l'api
  baseUrl = 'http://localhost:8000/api/';
  
  constructor( private http: HttpClient, private router:Router, private jwtHelper:JwtHelperService ) { }

   // Effectue la requête d'authentification de l'utilisateur
  loginUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', user);
  }

   // Déconnecte l'utilisateur en supprimant le token et redirige vers la page de connexion
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Récupère le nom d'utilisateur à partir du token stocké localement
  getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.username;
  }

   // Récupère l'ID de l'utilisateur à partir du token stocké localement
  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.user_id;
  }

   // Effectue la requête d'inscription d'un nouvel utilisateur
  signupUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', user);
  }

}


