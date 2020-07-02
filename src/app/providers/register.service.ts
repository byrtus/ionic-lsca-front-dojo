import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient,
                private router: Router,
                private toastCtrl: ToastController,
                public jwtHelper: JwtHelperService
    ) {
    }

    postManager(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string): Observable<any> {
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

    postCustomer(username: string, password: string, firstName: string, lastName: string, email: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/api/register/user`, {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        }, {observe: "response"})
    }

    async managerRegister(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string) {
        if (this.managerRegistryVerification(username, password, firstName, lastName, email, companyName, city, zipCode, street, localNumber)){
            this.postManager(username, password, firstName, lastName, email, companyName, city, zipCode, street, localNumber)
                .subscribe(async response => {
                    console.log(response);
                    const toast = await this.toastCtrl.create({
                        duration: 3000,
                        header: 'Company Registration: Successful',
                        message: 'Please Login'
                    });
                    await toast.present();
                    await this.router.navigateByUrl('/login');
                }, async error => {
                    const toast = await this.toastCtrl.create({
                        duration: 3000,
                        header: 'Company Registration: Fail',
                        message: 'Can not Access to server'
                    });
                    await toast.present();
                });
        }else {
            await (await this.toastCtrl.create({
                message: 'All Data must be fill',
                duration: 2000
            })).present();
        }
    }

    async customerRegister(username: string, password: string, firstName: string, lastName: string, email: string) {
        if (this.customerRegistryVerification(username, password, firstName, lastName, email)) {
            this.postCustomer(username, password, firstName, lastName, email)
                .subscribe(async response => {
                    console.log(response);
                    const toast = await this.toastCtrl.create({
                        duration: 3000,
                        header: 'User Registration: Successful',
                        message: 'Please Login'
                    });
                    await toast.present();
                    await this.router.navigateByUrl('/login');
                }, async error => {
                    const toast = await this.toastCtrl.create({
                        duration: 3000,
                        header: 'User Registration: Fail',
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

    customerRegistryVerification(username: string, password: string, firstName: string, lastName: string, email: string): boolean {

        return !(username == '' || password == '' || firstName == '' || lastName == '' || email == '')

    }

    managerRegistryVerification(username: string, password: string, firstName: string, lastName: string, email: string, companyName: string, city: string, zipCode: string, street: string, localNumber: string): boolean {

        return !(username == '' || password == '' || firstName == '' || lastName == '' || email == '' || companyName == '' || city == '' || zipCode == '' || street == '' || localNumber == '')

    }
}

