import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyageService } from '../service/voyage.service';

@Component({
  selector: 'app-editvoyage',
  templateUrl: './editvoyage.component.html',
  styleUrls: ['./editvoyage.component.css']
})
export class EditvoyageComponent {
  
  //Initialisation
  voyage!: any;
  errorMessage!: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private voyageService: VoyageService) { }

   updateVoyageForm: FormGroup = new FormGroup({
                name: new FormControl(),
                });
  
  voyageid = this.route.snapshot.paramMap.get('voyage_id')?.toString();
  
  ngOnInit(): void {
    //Appelle la méthode pour récupérer les données du voyage 
    this.getVoyage();
  }

  getVoyage(): void {
    if (this.voyageid != null) {
      this.voyage = this.voyageService.getVoyage(this.voyageid).subscribe(
        voyage => {
          this.voyage = voyage;
          //Pré-rempli le formulaire avec les données du voyage
          this.updateVoyageForm.patchValue({
          name: this.voyage.title,
        });
      });
    }
  }

  submitVoyageUpdate() {
    //Si formulaire est valide, update voyage
    if(this.updateVoyageForm.valid){
      this.voyageService.updateVoyage(this.voyage.voyage_id, this.updateVoyageForm.value).subscribe({
        next: (response:any) => {
          console.log(response);
          let route = '/home/' + this.voyage.voyage_id;
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
