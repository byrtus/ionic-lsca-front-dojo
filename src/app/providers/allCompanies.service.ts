import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

const apiUrl = 'https://loyalty-card-stamp-app.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AllCompaniesService {

  constructor(private http: HttpClient) {
  }


  getCompanies(): Observable<any> {
    const header ={ headers: new HttpHeaders()
        .set('Authorization',  `${AuthService.getToken()}`)}
    return this.http.get<any>(`${apiUrl}/api/companies`, header)
  }

  getCompanyById(companyId) {
    const header ={ headers: new HttpHeaders()
          .set('Authorization',  `${AuthService.getToken()}`)}
    return this.http.get<any>(`${apiUrl}/api/companies/${companyId}`, header)

  }

}
