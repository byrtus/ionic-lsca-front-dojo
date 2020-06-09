import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _userId: any;
    authenticationState = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
        private router: Router
        ) {

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
                localStorage.setItem("Token", response.body['Authorization']);
                this._userId = response.body['UserId'];
                this.authenticationState.next(true);
                this.router.navigate(['wallet']);
            });
    }

    logout(){
        localStorage.clear();
        this.authenticationState.next(false);
        this.router.navigate(['login']);
    }

     isAuthenticated(){
        return this.authenticationState.value;
     }




}
