import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from './../service/auth.service';
import { VoyageService } from '../service/voyage.service';
import { DayService } from '../service/day.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailday',
  templateUrl: './detailday.component.html',
  styleUrls: ['./detailday.component.css']
})
export class DetaildayComponent {
  
  previousPage!: any;
  day!: any;
  errorMessage!: string;


  constructor (private route: ActivatedRoute, private service:UserService, private dayService: DayService, private voyageService: VoyageService, private authService: AuthService, private router: Router) {
    
  }

  dayid = this.route.snapshot.paramMap.get('day_id')?.toString();
  formattedDate!: string;

  ngOnInit(): void {
    this.getDay();
    }

  
 getDay(): void {
  if (this.dayid != null) {
    this.day = this.dayService.getDay(this.dayid).subscribe(
      day => {
        this.day = day;
        this.previousPage = '/home/' + this.day.voyage_id;
        const dateString = this.day.specifiedTime;
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { 
          month: "long", 
          day: "numeric", 
          year: "numeric" 
          
      }
      this.formattedDate = date.toLocaleDateString("en-US", options);
      });
      
   }
 }

 deleteDay() {
  if(confirm("Are you sure you want to delete this usage?")) {
  this.dayService.deleteDay(this.day.day_id).subscribe({
    next: (response:any) => {
      console.log(response);
      let route: string = '/home/' + this.day.voyage_id;
      this.router.navigate([route]); // Navigate to vehicle page
    },
    error : (error:any) => {
      console.log(error);
      this.errorMessage = error.error.message;
    }
  });
}
}
}
