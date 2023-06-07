import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {    
    // Check if token exist in the local storage
    const token = localStorage.getItem('token'); 
    //Si le token exists et n'est pas expiré, l'utilisateur est authentifié
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      //Sinon pas authentifié
      return false;
    }
  }

  
}
