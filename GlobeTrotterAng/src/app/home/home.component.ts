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
  userid = this.service.getUserId();

  voyages: any[] = [];
  searchText!: string;

  ngOnInit(): void {
    this.getUserVoyages();
  }

  getUserVoyages(): void {
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
      this.voyageService.searchVoyages(this.searchText).subscribe(
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
