import { Injectable, OnInit } from '@angular/core';
import { AngularFireModule, FirebaseApp, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from  "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import User from '../models/user';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

    currentUser = {} as User;  

    constructor(public  afAuth:  AngularFireAuth) {

     this.afAuth.onAuthStateChanged((user) => {
       if (user) {
         console.log(user);

         this.currentUser.id = user.uid;
         this.currentUser.username = user.displayName;
         this.currentUser.isLoggedIn = true;

       } else {
         console.log('no user');
          this.currentUser = {} as User;
        }
     });
    }


  register(email, password, username) {  

       this.afAuth.createUserWithEmailAndPassword(email, password)
       .then((userCredential) => {
         userCredential.user.updateProfile({displayName: username})
         this.currentUser.username = username;
         this.currentUser.isLoggedIn = true;
         this.currentUser.id = userCredential.user.uid;
      })
  
    
}

  login(email, password) {    

      this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        this.currentUser.username = userCredential.user.displayName;
        this.currentUser.isLoggedIn = true;
        this.currentUser.id = userCredential.user.uid;
          })
    
       

  }

  logout() {
    this.afAuth.signOut();
  
  
     this.currentUser.isLoggedIn = false;
     this.currentUser.username = '';
     this.currentUser.id = '';
  }
}
