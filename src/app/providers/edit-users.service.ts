import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class EditUsersService {

  constructor(private http: HttpClient,
              private router: Router,
              private toastCtrl: ToastController,
              public jwtHelper: JwtHelperService
  ) {
  }

  putCompany(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string, userId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/users/edit/manager/${userId}`, {
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

  putCustomerAndAdmin(username: string, password: string, firstName: string, lastName: string, email: string, userId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/users/edit/normal/${userId}`, {
      id: userId,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    }, {observe: "response"})
  }


  async userEdit(username: string, password: string, firstName: string, lastName: string, email: string, userId: string) {
    if (this.customerEditVerification(username, password, firstName, lastName, email)){
      this.putCustomerAndAdmin(username, password, firstName, lastName, email, userId).subscribe( async response => {
        const toast = await this.toastCtrl.create({
          duration: 3000,
          header: 'User Update: Successful',
        });
        await toast.present();
      }, async error => {
        const toast = await this.toastCtrl.create({
          duration: 3000,
          header: 'User Update: Fail',
          message: 'Can not Access to server'
        });
        await toast.present();
      });
    } else {
      await (await this.toastCtrl.create({
        message: 'All Data must be fill',
        duration: 2000
      })).present();
    }
  }

  async companyEdit(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string, userId: string) {
    if (this.managerEditVerification(username, password, firstName, lastName, email, companyName, city, zipCode, street, localNumber)){
      this.putCompany(username, password, firstName, lastName, email, companyName, city, zipCode, street, localNumber , userId).subscribe( async response => {
        const toast = await this.toastCtrl.create({
          duration: 3000,
          header: 'Company Update: Successful',
        });
        await toast.present();
      }, async error => {
        const toast = await this.toastCtrl.create({
          duration: 3000,
          header: 'Company Update: Fail',
          message: 'Can not Access to server'
        });
        await toast.present();
      });
    } else {
      await (await this.toastCtrl.create({
        message: 'All Data must be fill',
        duration: 2000
      })).present();
    }
  }

  customerEditVerification(username: string, password: string, firstName: string, lastName: string, email: string): boolean {

    return !(username == '' || password == '' || firstName == '' || lastName == '' || email == '')

  }

  managerEditVerification(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string): boolean {

    return !(username == '' || password == '' || firstName == '' || lastName == '' || email == '' || companyName == '' || city == '' || zipCode == '' || street == '' || localNumber == '')

  }
}