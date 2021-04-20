import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 public get user(): User {
    return this.userService.currentUser;
 }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  logout() {
    try{
      this.userService.logout();
      this.router.navigate(['/']);
    }catch(e) {
      console.log(e);
    }
  }
}
