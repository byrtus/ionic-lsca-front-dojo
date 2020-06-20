import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LoginService} from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  getUserById(userId): Observable<any> {
    const header ={ headers: new HttpHeaders()
          .set('Authorization',  `${this.loginService.getToken()}`)}
    return this.http.get<any>(`${environment.apiUrl}/api/users/${userId}`, header)
  }

  getAllUsers(): Observable<any> {
    const header ={ headers: new HttpHeaders()
          .set('Authorization',  `${this.loginService.getToken()}`)}
    return this.http.get<any>(`${environment.apiUrl}/api/users`, header)
  }
}
