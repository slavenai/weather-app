import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../register/register/register.component.css']
})
export class LoginComponent {

  constructor( private router: Router, private userService: UserService) {}

  loginHandler(data) {
    try{
      const {email, password} = data;
      this.userService.login(email, password);
      this.router.navigate(['/'])
    } catch(e) {
      console.log(e);
    }

  }
}
