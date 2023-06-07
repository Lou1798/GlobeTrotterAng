import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DayService } from '../service/day.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyageService } from '../service/voyage.service';

@Component({
  selector: 'app-newday',
  templateUrl: './newday.component.html',
  styleUrls: ['./newday.component.css']
})
export class NewdayComponent {
  errorMessage!: string;
  voyage!: any;
  

  constructor(private builder: FormBuilder, private service: DayService, 
    private route: ActivatedRoute,private router: Router, private voyageService: VoyageService) {

  }

  voyageid = this.route.snapshot.paramMap.get('voyage_id')?.toString();
  
  
  previousPage: string = '/home/'+ this.voyageid;

  // create a form group
  dayform=this.builder.group({
    title:this.builder.control('',Validators.required),
    content:this.builder.control('',Validators.required),
    specifiedTime:this.builder.control(''),
    specifiedLocation:this.builder.control(''),
    voyage_id:this.voyageid,
  });


  ngOnInit(): void {
    this.getVoyage();
  }

 getVoyage(): void {
  if (this.voyageid != null) {
    this.voyage = this.voyageService.getVoyage(this.voyageid).subscribe(
      voyage => {
        this.voyage = voyage;
      });
    }
 }


  // get the form controls and validate; if valid, call the service (create a user)
  submitDay(){
    if(this.dayform.valid){
      this.service.createDay(this.dayform.value).subscribe({
        next: (response:any) => {
          let route = '/home/' + this.voyage.voyage_id;
          this.router.navigate([route]); // Navigate to vehicle page
        
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Please, fill all the fiels correctly';
    }
  }
}


