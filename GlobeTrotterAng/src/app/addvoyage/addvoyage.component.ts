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
  // initialisation du formulaire, message d'erreur...
  voyageForm!: FormGroup;
  voyages: any[] = [];
  voyage!: any;
  errorMessage!: string;

  constructor(
    private builder: FormBuilder, 
    private user: UserService, 
    private voyageService: VoyageService,
    private router: Router,
    
    ) { }

    //id de l'utilisateur récupéré depuis le UserService
    userid = this.user.getUserId();

  ngOnInit() {
    // create a form group
    this.voyageForm = this.builder.group({
      name: this.builder.control('',Validators.required),
      user_id:  this.userid, 
    });

  }
  
  // get the form value; if valid create a user
  submitVoyage(){
    if(this.voyageForm.valid){
      this.voyageService.addVoyage(this.voyageForm.value).subscribe({
        next: (response:any) => {
          //redirige vers page d'acceuil
          this.router.navigate(['/home']); 
        },
        error : (error:any) => {
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Please, fill all the fields correctly';
    }
  }
}
