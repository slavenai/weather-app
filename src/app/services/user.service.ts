import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import User from '../models/user';


@Injectable()
export class UserService {

   currentUser = {} as User;

  constructor(public  afAuth:  AngularFireAuth) { 
 
  }
  
     register(email, password, username):User {  

       this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
         userCredential.user.updateProfile({displayName: username})
          this.currentUser.username = username;
          this.currentUser.isLoggedIn = true;     
      })
     
    return this.currentUser;
}

  login(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      this.currentUser.username = userCredential.user.displayName;
      this.currentUser.isLoggedIn = true;  
        })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.currentUser.isLoggedIn = false;
    }).catch((e) =>  {
      console.log(e);
    })
  }
}
