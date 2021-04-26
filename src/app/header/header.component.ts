import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  currentUser = null;

  constructor(private userService: UserService, private router: Router) { }

ngDoCheck() {
this.currentUser = this.userService.currentUser
}


  logout() {
    try{
      this.userService.logout();
      this.router.navigate(['/login']);
    }catch(e) {
      console.log(e);
    }
  }
}
