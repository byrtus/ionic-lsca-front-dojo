import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private http: HttpClient
  ) { }

  getUserById(userId): Observable<any> {
    const header ={ headers: new HttpHeaders()
          .set('Authorization',  `${AuthService.getToken()}`)}
    return this.http.get<any>(`${environment.apiUrl}/api/users/${userId}`, header)
  }
}
