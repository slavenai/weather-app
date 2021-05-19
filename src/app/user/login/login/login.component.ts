import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from 'src/app/user/validator/email.validator'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../register/register/register.component.css']
})
export class LoginComponent {


  constructor( private router: Router, public userService: UserService) {}

  get errMessage() {
    return this.userService.errorMsg;
  } 

  loginHandler(data) {
   
      const {email, password} = data;
   
      this.userService.login(email, password);

        this.router.navigate(['/'])     
    

  }
}
