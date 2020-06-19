import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  users: any[];
  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }

  getUsers(): Observable<any>  {
    const header = {
      headers: new HttpHeaders()
          .set('Authorization', `${this.loginService.getToken()}`)
    }
    return this.http.get<any>(`${environment.apiUrl}/api/users`, header)
  }

  getCompanies(): Observable<any>  {
    const header = {
      headers: new HttpHeaders()
          .set('Authorization', `${this.loginService.getToken()}`)
    }
    return this.http.get<any>(`${environment.apiUrl}/api/companies`, header)
  }

  getStampCards(){
    const header = {
      headers: new HttpHeaders()
          .set('Authorization', `${this.loginService.getToken()}`)
    }
    return this.http.get<any>(`${environment.apiUrl}/api/stampcards`, header)

  }
}