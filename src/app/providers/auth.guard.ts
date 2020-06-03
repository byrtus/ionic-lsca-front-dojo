import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // constructor(public auth: AuthService, public router: Router) {
    // }

    constructor() {
        console.log("dupa")
    }


    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("dupa3");
      return true;

    }

    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): boolean {
    //
    //     console.log("dupa2");
    //
    //     if (!this.auth.isAuthenticated()) {
    //
    //         console.log("dupa1");
    //
    //         this.router.navigate(['login']);
    //         return false;
    //     }
    //     return true;
    // }

}
