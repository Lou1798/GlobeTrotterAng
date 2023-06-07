import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from './../service/auth.service';
import { VoyageService } from '../service/voyage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  previousPage: string = '/home';

  constructor (private service:UserService, private voyageService: VoyageService, private authService: AuthService) {}

  username = this.service.getUsername();
  userid = this.service.getUserId().toString();
  

  voyages: any[] = [];
  searchText!: string;

  ngOnInit(): void {
    this.getUserVoyages();
  }

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

  searchVoyages(): void {
    if (this.searchText) {
      this.voyageService.searchVoyages(this.userid).subscribe(
        (voyagedata: any) => {
          this.voyages = voyagedata;
        },
        (error: any) => {
          console.log(error.error.message);
        }
      )
    } else {
      this.getUserVoyages();
    }
  }

  searchNameVoyages(): void {
    if (this.searchText) {
      this.voyageService.searchNameVoyages(this.searchText).subscribe(
        (voyagedata: any) => {
          this.voyages = voyagedata;
        },
        (error: any) => {
          console.log(error.error.message);
        }
      )
    } else {
      this.getUserVoyages();
    }
  }
}
