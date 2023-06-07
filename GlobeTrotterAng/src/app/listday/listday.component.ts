import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from './../service/auth.service';
import { VoyageService } from '../service/voyage.service';
import { DayService } from '../service/day.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listday',
  templateUrl: './listday.component.html',
  styleUrls: ['./listday.component.css']
})
export class ListdayComponent {
  previousPage: string = '/home';

  days: any[] = [];
  dates: any[] = [];
  voyage!: any;
  searchText!: string;

  username = this.service.getUsername();
  userid = this.service.getUserId().toString();
  voyageid = this.route.snapshot.paramMap.get('voyage_id')?.toString();
  

  constructor (private route: ActivatedRoute, private service:UserService, private dayService: DayService, private voyageService: VoyageService, private authService: AuthService, private router: Router) {
    
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

 

  getDayVoyages(): void {
    if (typeof this.voyageid === 'string') {
      console.log(this.voyageid)
      this.dayService.getDayVoyages(this.voyageid).subscribe({
        next: (daydata: any) => {
              this.days = daydata;
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
