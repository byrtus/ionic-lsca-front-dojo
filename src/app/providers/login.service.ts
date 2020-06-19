import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationStart, Router, RouterEvent} from "@angular/router";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {filter, map, tap} from "rxjs/operators";
import {LoadingController, ToastController} from "@ionic/angular";

// import { timeout } from 'rxjs/operators/timeout';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _userId: any;
    private authenticationState$ = new BehaviorSubject(this.isTokenValid());
    private userType: any;
    private _pass: any;
    private loading;

    get pass(): any {
        return this._pass;
    }

    constructor(private http: HttpClient,
                private router: Router,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                public jwtHelper: JwtHelperService) {
        router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationStart),
                tap((event: NavigationStart) => this.authenticationState$.next(this.isTokenValid()))
            ).subscribe();
    }

    get userId(): any {
        return this._userId;
    }

    postLogin(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/login`, {
            username: username,
            password: password
        }, {observe: "response"})
    }

    login(username: string, password: string): any {
        this._pass = password;
        this.loadingCtrl.create({
            message: 'Authentication...',
            spinner: "bubbles"
        }).then((overlay) => {
            this.loading = overlay;
            this.loading.present();
            this.postLogin(username, password)
                .subscribe(async response => {
                    localStorage.setItem("Token", response.body['Authorization']);
                    this._userId = response.body['UserId'];
                    this.authenticationState$.next(this.isTokenValid());

                    const toast = await this.toastCtrl.create({
                        position: 'top',
                        duration: 3000,
                        header: 'Login Successful',
                        message: 'Welcome ' + username
                    });
                    await toast.present();

                    this.checkUserType(this._userId);
                }, async error => {
                    this.loginDismiss();
                    const toast = await this.toastCtrl.create({
                        duration: 3000,
                        header: 'Login Fail.',
                        message: 'Bad login or password.'
                    })
                    await toast.present();
                });
        });

    }

    loginDismiss(){
        this.loading.dismiss();
    }

    private checkUserType(userId: String) {

        this.getUserById(userId).toPromise().then(data => {
            this.userType = (data['roles'].toString())

        }).finally(() => {
            this.redirectUserType()
        })

    }

    redirectUserType() {
        console.log("this is USER TYPE --> " + this.userType)
        if (this.userType == 'USER') {
            console.log('Customer Page')
            this.router.navigateByUrl('/menu/wallet');
        } else if (this.userType == 'MANAGER') {
            console.log('Manager Page')
            this.router.navigateByUrl('/menu/stat');
        } else if (this.userType == 'ADMIN') {
            console.log('Admin Page')
            this.router.navigateByUrl('/menu/statsA');
        } else {

        }
    }

    getUserById(userId) {

        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `${this.getToken()}`)
        }
        return this.http.get(`${environment.apiUrl}/api/users/${userId}`, header)

    }


    async logout() {
        localStorage.clear();
        this.authenticationState$.next(false);
        this.router.navigateByUrl('/login');
        const toast = await this.toastCtrl.create({
            position: "top",
            duration: 2000,
            message: 'You have Successful Logout',
        });
        await toast.present();
    }

    getIsAuthenticated(): Observable<boolean> {
        return this.authenticationState$.asObservable();
    }

    private isTokenValid(): boolean {
        return !this.jwtHelper.isTokenExpired(localStorage.getItem('Token'));
    }

    getToken() {
        return localStorage.getItem('Token');
    }
}
