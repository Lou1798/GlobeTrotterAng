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
  
  voyage!: any;
  errorMessage!: string;
  previousPage!: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private voyageService: VoyageService) { }

   updateVoyageForm: FormGroup = new FormGroup({
                name: new FormControl(),
                });
  
  voyageid = this.route.snapshot.paramMap.get('voyage_id')?.toString();
  
  ngOnInit(): void {
    this.getVoyage();
  }

 getVoyage(): void {
  if (this.voyageid != null) {
    this.voyage = this.voyageService.getVoyage(this.voyageid).subscribe(
      voyage => {
        this.voyage = voyage;
        this.updateVoyageForm.patchValue({
          name: this.voyage.title,
        });
      });
    }
 }

  submitVoyageUpdate() {
    if(this.updateVoyageForm.valid){
      this.voyageService.updateVoyage(this.voyage.voyage_id, this.updateVoyageForm.value).subscribe({
        next: (response:any) => {
          console.log(response);
          let route = '/home/' + this.voyage.voyage_id;
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
