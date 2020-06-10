import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationStart, Router, RouterEvent} from "@angular/router";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {filter, map, tap} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _userId: any;
    private authenticationState$ = new BehaviorSubject(this.isTokenValid());

    constructor(private http: HttpClient,
                private router: Router,
                public jwtHelper: JwtHelperService) {
        router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationStart),
                tap((event: NavigationStart) => this.authenticationState$.next(this.isTokenValid()))
            ).subscribe();
    }

    get userId(): any {
        return this._userId;
    }

    postLogin(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/login`, {username: username, password: password}, {observe: "response"})
    }

    login(username: string, password: string) {
        //jak coś może być trzeba obciąć "Bearer "??????
        this.postLogin(username, password)
            .subscribe((response) => {
                console.log('test');
                localStorage.setItem("Token", response.body['Authorization']);
                this._userId = response.body['UserId'];
                this.authenticationState$.next(this.isTokenValid());
                this.router.navigateByUrl('/tabs/wallet');
            });
    }

    logout(){
        localStorage.clear();
        this.authenticationState$.next(false);
        this.router.navigateByUrl('/login');
    }

     getIsAuthenticated(): Observable<boolean> {
        return this.authenticationState$.asObservable();
     }

    private isTokenValid(): boolean {
        return !this.jwtHelper.isTokenExpired(localStorage.getItem('Token'));
    }

    getToken() {
        return localStorage.getItem('Token');
    }
}
