import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
              private router: Router,
              public jwtHelper: JwtHelperService
  ) {
  }

  postManager(username: string, password: string, firstName: string, lastName: string, email: String, companyName: string, city: string, zipCode: string, street: string, localNumber: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/register/manager`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      companyName: companyName,
      city: city,
      zipCode: zipCode,
      street: street,
      localNumber: localNumber
    }, {observe: "response"})
  }

  postCustomer(username: string, password: string, firstName: string, lastName: string, email: String): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/register/user`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    }, {observe: "response"})
  }

  managerRegister(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string) {
    this.postManager(username, password, firstName, lastName, email, companyName, city, zipCode, street, localNumber)
        .subscribe((response) => {
          console.log(response);
        })
  }

  customerRegister(username: string, password: string, firstName: string, lastName: string, email: string) {
    this.postCustomer(username, password, firstName, lastName, email)
        .subscribe((response) => {
          console.log(response);
        })
  }
}

