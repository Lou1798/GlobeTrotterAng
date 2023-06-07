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

  day!: any;
  errorMessage!: string;
  previousPage!: string;
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

      dayid = this.route.snapshot.paramMap.get('day_id')?.toString();
      
      ngOnInit(): void {
        this.getDay();
      }
    
     getDay(): void {
      if (this.dayid != null) {
        this.day = this.dayService.getDay(this.dayid).subscribe(
          day => {
            this.day = day;
            this.previousPage = '/detailday/' + this.day.day_id;
            const dateString = this.day.specifiedTime;
            const date = new Date(dateString);

            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant le mois si nécessaire
            const days = ("0" + date.getDate()).slice(-2); // Ajoute un zéro devant le jour si nécessaire
            this.formattedDate = `${year}-${month}-${days}`;
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
            this.router.navigate([route]); // Navigate to vehicle page
          },
          error : (error:any) => {
            console.log(error);
            this.errorMessage = error.error.message;
          }
        });
      } else {
        this.errorMessage = 'Some fields seem to be emtpy or have the wrong format, please fill them out';
      }
    }
}
