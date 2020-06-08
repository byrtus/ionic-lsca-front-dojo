import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


const apiUrl = 'https://loyalty-card-stamp-app.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    userId: any;
    constructor(
        private http: HttpClient,
        private router: Router
        ) {

    }

    postLogin(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${apiUrl}/login`, {username: username, password: password}, {observe: "response"})
    }

    login(username: string, password: string) {
        //jak coś może być trzeba obciąć "Bearer "??????
        this.postLogin(username, password)
            .subscribe((response) => {
                localStorage.setItem("Token", response.body['Authorization']);
                this.router.navigateByUrl('/tabs/wallet');

            });
    }




}
