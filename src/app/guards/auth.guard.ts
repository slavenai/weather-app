import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import User from "../models/user";
import { UserService } from "../services/user.service";

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private userService: UserService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         const isLogged = route.data.isLogged;
         if (isLogged == false && this.userService.currentUser.isLoggedIn == undefined && typeof isLogged === 'boolean') {
                 return true;             
         } else if (isLogged == this.userService.currentUser.isLoggedIn && typeof isLogged === 'boolean') {
             return true;
         }

        const url = this.router.url;
        this.router.navigateByUrl(url);

         return false;
    }
    
}
