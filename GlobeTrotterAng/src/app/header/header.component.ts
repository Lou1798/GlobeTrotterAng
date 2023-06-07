import { Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  constructor(private userService: UserService, 
    private router: Router) {}
  
  //Récupère le nom d'utilisateur à partir de service UserService
  username = this.userService.getUsername();
  
  logout() {
     // Déconnecte l'utilisateur en appelant la méthode logout() du service UserService
    this.userService.logout();
    //Redirige vers login 
    this.router.navigate(['/login']);
  }

  isHomePage(): boolean {
    // Vérifie si l'URL actuelle contient le mot "home"
    return window.location.href.includes("home");
}

}
