import { Component } from '@angular/core';
import { UserService } from '../../app/service/user.service';
import { AuthService } from '../../app/service/auth.service';
import { VoyageService } from '../../voyage/service/voyage.service';
import { DayService } from '../service/day.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listday',
  templateUrl: './listday.component.html',
  styleUrls: ['./listday.component.css']
})
export class ListdayComponent {

  //Initialisation
  days: any[] = [];
  dates: any[] = [];
  voyage!: any;
  searchText!: string;

  //Récupère username de l'utilisatuer connecté depuis userService
  username = this.service.getUsername();
  //Récupère l'id de l'user connecté
  userid = this.service.getUserId().toString();
  //Récupère l'id voyage depuis l'URL
  voyageid = this.route.snapshot.paramMap.get('voyage_id')?.toString();
  

  constructor (private route: ActivatedRoute, 
    private service:UserService, 
    private dayService: DayService, 
    private voyageService: VoyageService, 
    private authService: AuthService, 
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.getVoyage();
    this.getDayVoyages();
  }

 getVoyage(): void {
  if (this.voyageid != null) {
    this.voyage = this.voyageService.getVoyage(this.voyageid).subscribe(
      voyage => {
        this.voyage = voyage;
      });
    }
 }

  getDays(): void {
    this.dayService.getDays().subscribe({
      next: (daydata: any) => {
        this.days = daydata;    
      },
      error: (error: any) => {
        console.log(error.error.message);
      }
    });
  }

 //Récupère les jours liés au voyage spécifié
  getDayVoyages(): void {
    if (typeof this.voyageid === 'string') {
      //console.log(this.voyageid)
      this.dayService.getDayVoyages(this.voyageid).subscribe({
        next: (daydata: any) => {
          this.days = daydata;
          //Formatte les dates des jours après les avoir récupéré
          //grâce à formatDatesForDays
          this.formatDatesForDays();
        },
        error: (error: any) => {
          console.log(error.error.message);
        }
      });
    }else {
      console.log('No voyage id was found');
    }
  }

  //Formate les dates pour chaque jour au format choisi
  //ici à l'américaine
  formatDatesForDays(): void {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    this.days.forEach((day: any) => {
      const dateString = day.specifiedTime;
      const date = new Date(dateString);
      day.formattedDate = date.toLocaleDateString('en-US', options);
    });
  }

  searchDays(): void {
    if (this.searchText) {
      this.dayService.searchDays(this.userid).subscribe(
        (daydata: any) => {
          this.days = daydata;
        },
        (error: any) => {
          console.log(error.error.message);
        }
      )
    } else {
      this.getDays();
    }
  }
}
