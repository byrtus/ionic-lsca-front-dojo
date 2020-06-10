import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LoginService} from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class AllCompaniesService {

  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }


  getCompanies(): Observable<any> {
    const header ={ headers: new HttpHeaders()
        .set('Authorization',  `${this.loginService.getToken()}`)}
    return this.http.get<any>(`${environment.apiUrl}/api/companies`, header)
  }

  getCompanyById(companyId) {
    const header ={ headers: new HttpHeaders()
          .set('Authorization',  `${this.loginService.getToken()}`)}
    return this.http.get<any>(`${environment.apiUrl}/api/companies/${companyId}`, header)

  }

}
