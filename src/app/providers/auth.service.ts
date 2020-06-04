import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

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
}
