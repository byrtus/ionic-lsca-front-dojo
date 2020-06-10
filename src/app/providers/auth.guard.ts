import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginService} from "./login.service";
import {map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService,
                private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.loginService.getIsAuthenticated().pipe(
            map((isAuth: boolean) => {
                console.log(next);
                if (isAuth) {
                    return true;
                }
                console.log('test2');
                this.router.navigate(['login']);
                return false;
            })
        );
    }

}
