import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoyageService } from '../service/voyage.service';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-addvoyage',
  templateUrl: './addvoyage.component.html',
  styleUrls: ['./addvoyage.component.css']
})
export class AddvoyageComponent {
  voyageForm!: FormGroup;
  voyages: any[] = [];
  errorMessage!: string;
  previousPage: string = '/home';

  constructor(
    private builder: FormBuilder, 
    private user: UserService, 
    private voyageService: VoyageService,
    private router: Router,
    
    ) { }

    userid = this.user.getUserId();

  ngOnInit() {
    // create a form group
    this.voyageForm = this.builder.group({
      name: this.builder.control('',Validators.required),
      user_id:  this.userid, 
    });

  }
  
  // get the form controls and validate; if valid, call the service (create a user)
  submitVoyage(){
    if(this.voyageForm.valid){
      this.voyageService.addVoyage(this.voyageForm.value).subscribe({
        next: (response:any) => {
          //go back to home
          this.router.navigate(['/home']); 
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Please, fill all the fields correctly';
    }
  }
}
