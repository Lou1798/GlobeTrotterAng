import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage!: string;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: UserService, private router: Router) {

  }

  // create a form group
  signupform=this.builder.group({
    username:this.builder.control('',Validators.required),
    firstname:this.builder.control(''),
    lastname:this.builder.control(''),
    password:this.builder.control('',Validators.required),
  });

  // get the form controls and validate; if valid, call the service (create a user)
  submitSignup(){
    if(this.signupform.valid){
      this.service.signupUser(this.signupform.value).subscribe({
        next: (response:any) => {
          this.router.navigate(['/login']);
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
