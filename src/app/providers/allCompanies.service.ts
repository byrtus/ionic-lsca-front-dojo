import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import {LoginService} from "./login.service";
import {ToastController} from "@ionic/angular";


@Injectable({
    providedIn: 'root'
})
export class AllCompaniesService {

    company: any;
    stampCardsProgresses: any;
    stampCardId: any;
    private _countStampCardsProgresses: any = ' ';

    constructor(private http: HttpClient,
                private toastCtrl: ToastController,
                private loginService: LoginService) {
    }


    get countStampCardsProgresses(): string {
        return this._countStampCardsProgresses;
    }

    set countStampCardsProgresses(value: string) {
        this._countStampCardsProgresses = value;
    }

    getCompanies(): Observable<any> {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `${this.loginService.getToken()}`)
        }
        return this.http.get<any>(`${environment.apiUrl}/api/companies`, header)
    }

    getCountOfUseCompanyStampCard(companyId) {
        this.getCompanyUserById(companyId).toPromise().then(data => {
            this.stampCardId = data['userSpecifics']['company']['stampCard']['id'].toString()
        }).finally(() => {
            this.stampCardsProgresses = this.getStampCardsProgressesById();
        }).finally(() => {
            this.print(this.stampCardId)
        }).finally(() => {
            // setTimeout(() => {
            console.log(this._countStampCardsProgresses);
            // }, 1000)
        });

    }


    print(stampCardId){
        let count: any = ' ';
        this.stampCardsProgresses.subscribe(res => {
            // console.log(res)
            // res.map(console.log, console)
            let result = 0;
            res.forEach(data => {
               if (stampCardId == data['stampCard']['id']){
                   result = result + 1;
               }
            })
            count = result;
            // setTimeout(() => {

              this._countStampCardsProgresses = result.toString();
            // }, 1000)


        }).finally(()=>{
            this._countStampCardsProgresses = count.toString()
            console.log(count)
        })

    }

    getCompanyUserById(companyId): Observable<any> {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `${this.loginService.getToken()}`)
        }
        return this.http.get<any>(`${environment.apiUrl}/api/users/${companyId}`, header)

    }

    getCompanyById(companyId): Observable<any> {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `${this.loginService.getToken()}`)
        }
        return this.http.get<any>(`${environment.apiUrl}/api/companies/${companyId}`, header)

    }

    getStampCardsProgressesById(): Observable<any> {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `${this.loginService.getToken()}`)
        }
        return this.http.get<any>(`${environment.apiUrl}/api/stampcards-progresses`, header)
    }

    addStampForUser(customerId: string, stampCardId: string, userType: string){
        if (userType == 'companyID:'){
            let toast = this.toastCtrl.create({
                duration: 3000,
                header: 'You can scan only Customers QR',
            });

            toast.then((toast) =>
                toast.present()
            )
            // toast.present();
        }else {
            this.putStampForUser(customerId,stampCardId).subscribe( async response => {
                const toast = await this.toastCtrl.create({
                    duration: 3000,
                    header: 'Customer Add Stamp: Successful',
                });
                await toast.present();
            }, async error => {
                const toast = await this.toastCtrl.create({
                    duration: 3000,
                    header: 'Customer Add Stamp: Fail',
                    message: 'Can not Access to server'
                });
                await toast.present();
            });
        }
    }

    putStampForUser(customerId: string, stampCardId: string): Observable<any>{
        return this.http.put<any>(`${environment.apiUrl}/api/stampcards-progresses/${customerId}/${stampCardId}`, {
            userId: customerId,
            stampCardId: stampCardId
        }, {observe: "response"})
    }

}
