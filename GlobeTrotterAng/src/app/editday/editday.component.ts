import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from '../service/day.service';

@Component({
  selector: 'app-editday',
  templateUrl: './editday.component.html',
  styleUrls: ['./editday.component.css']
})
export class EditdayComponent {
 //Initialisation
  day!: any;
  errorMessage!: string;
  formattedDate!: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dayService: DayService) { }

  updateDayForm: FormGroup = new FormGroup({
    title:new FormControl(),
    content:new FormControl(),
    specifiedTime:new FormControl(),
    specifiedLocation:new FormControl(),
  });

  //Récupération de l'id du jour depuis l'URL
  dayid = this.route.snapshot.paramMap.get('day_id')?.toString();
      
  ngOnInit(): void {
    //Appelle la méthode pour résupérer les données du jour on init
    this.getDay();
  }
    
  getDay(): void {
    if (this.dayid != null) {
      this.day = this.dayService.getDay(this.dayid).subscribe(
        day => {
          this.day = day;
          const dateString = this.day.specifiedTime;
          const date = new Date(dateString);

          const year = date.getFullYear();
          // Ajoute un zéro devant le mois si nécessaire
          const month = ("0" + (date.getMonth() + 1)).slice(-2); 
          // Ajoute un zéro devant le jour si nécessaire
          const days = ("0" + date.getDate()).slice(-2); 
          this.formattedDate = `${year}-${month}-${days}`;
          //Pré-rempli le formulaire avec les données de la journée
          this.updateDayForm.patchValue({
            title: this.day.title,
            content: this.day.content,
            specifiedTime: this.formattedDate,
            specifiedLocation: this.day.specifiedLocation
          });  
        });
      }
    }

  submitDayUpdate() {
    console.log(this.updateDayForm.value);
    if(this.updateDayForm.valid){
      this.dayService.updateDay(this.day.day_id, this.updateDayForm.value).subscribe({
        next: (response:any) => {
          console.log(response);
          let route = '/detailday/' + this.day.day_id;
          this.router.navigate([route]); 
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill all the fields correctly';
    }
  }
}
