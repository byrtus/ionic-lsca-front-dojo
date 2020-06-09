import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( this.isAuthenticated());

    constructor(public jwtHelper: JwtHelperService) {
    }

    // ...
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('Token');
        console.log(token);
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }

    static getToken() {
        return localStorage.getItem('Token');
    }

    getIsLogged$(): Observable<boolean> {
        return this.isLogged$.asObservable();
    }

    updateIsLogged() {
        this.isLogged$.next(this.isAuthenticated());
    }
}
