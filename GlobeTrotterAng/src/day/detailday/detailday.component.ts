import { Component } from '@angular/core';
import { UserService } from '../../app/service/user.service';
import { AuthService } from '../../app/service/auth.service';
import { VoyageService } from '../../voyage/service/voyage.service';
import { DayService } from '../service/day.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailday',
  templateUrl: './detailday.component.html',
  styleUrls: ['./detailday.component.css']
})
export class DetaildayComponent {
  //Initialisation du message d'erreur...
  day!: any;
  errorMessage!: string;


  constructor (private route: ActivatedRoute, 
    private service:UserService, 
    private dayService: DayService, 
    private voyageService: VoyageService, 
    private authService: AuthService, 
    private router: Router) {
    
  }

  //id du jour récupéré depuis les paramètres de l'URL
  dayid = this.route.snapshot.paramMap.get('day_id')?.toString();
  //Pour formatter la date au format d'affichage voulu
  formattedDate!: string;

  ngOnInit(): void {
    //récupère les détails du jour on init
    this.getDay();
    }

  
 getDay(): void {
  if (this.dayid != null) {
    this.day = this.dayService.getDay(this.dayid).subscribe(
      day => {
        this.day = day;
        //Formatage de la date après récupération dans le format décidé
        //ici à l'américaine
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
  if(confirm("Are you sure you want to delete this day?")) {
  this.dayService.deleteDay(this.day.day_id).subscribe({
    next: (response:any) => {
      console.log(response);
      // Redirige vers la page de détail du voyage
      let route: string = '/home/' + this.day.voyage_id;
      this.router.navigate([route]); 
    },
    error : (error:any) => {
      this.errorMessage = error.error.message;
    }
  });
}
}
}
