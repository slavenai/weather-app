import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from '../../validator/email.validator';
import { passwordsValidator } from '../../validator/passwords.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { 

  }

  ngOnInit(): void {

  const passControl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
  this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, emailValidator]],
    password: passControl,
    repassword: ['', [Validators.required, Validators.minLength(6), passwordsValidator(passControl)]]
});
  }

  registerHandler() {
    try{
      const {email, password, username} = this.registerForm.value;
      this.userService.register(email, password, username);
    
         this.router.navigate(['/']);
    } catch(e) {
        console.log(e);
    }
  
   
  }
}
