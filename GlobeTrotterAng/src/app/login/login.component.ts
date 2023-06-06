import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage!: string;

  constructor(private builder: FormBuilder, private service: UserService, private router: Router) {

  }

  loginform=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  });

  submitLogin(){
    if(this.loginform.valid){
      this.service.loginUser(this.loginform.value).subscribe({
        next: (response:any) => {
          console.log(response);
          localStorage.setItem('token', response.token)
          this.router.navigate(['/home']);
        },
        error : (error:any) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill out all the fields';
    }
  }

}
