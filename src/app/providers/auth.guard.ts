import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    // constructor(public auth: AuthService, public router: Router) {
    // }

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
        console.log("dupa")
    }


    // canActivate(
    //   next: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //     console.log("dupa3");
    //   return true;
    //
    // }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        console.log("dupa2");

        if (!this.loginService.isAuthenticated()) {

            console.log("dupa1");

            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
