import { Component } from '@angular/core';
import { UserService } from '../../app/service/user.service';
import { AuthService } from '../../app/service/auth.service';
import { VoyageService } from '../service/voyage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //Initialisation
  voyages: any[] = [];
  searchText!: string;

  constructor (private service:UserService, 
    private voyageService: VoyageService, 
    private authService: AuthService) {}

  //Récupère l'username et id de l'utilisateur connecté grâce à userService
  username = this.service.getUsername();
  userid = this.service.getUserId().toString();
  
  ngOnInit(): void {
    this.getUserVoyages();
  }

  //Récupère tous les voyages
  //Pas utilisé finalement comme on veut les voyages d'un utilisateur
  getVoyages(): void {
    this.voyageService.getVoyages().subscribe({
      next: (voyagedata: any) => {
        this.voyages = voyagedata;
      },
      error: (error: any) => {
        console.log(error.error.message);
      }
    });
  }

  //Récupère les voyages de l'utilisateur connecté
  getUserVoyages(): void {
    console.log(this.userid);
    this.voyageService.getUserVoyages(this.userid).subscribe({
      next: (voyagedata: any) => {
        this.voyages = voyagedata;
      },
      error: (error: any) => {
        console.log(error.error.message);
      }
    });
  }

  //Recherche des voyages en fonction du nom
  searchNameVoyages(): void {
    if (this.searchText) {
      console.log(this.searchText);
      this.voyageService.searchNameVoyages(this.searchText, this.userid).subscribe(
        (voyagedata: any) => {
          this.voyages = voyagedata;
        },
        (error: any) => {
          console.log(error.error.message);
        }
      )
    } else {
      console.log("No results");
      this.voyageService.getUserVoyages(this.userid);
    }
  }
}
