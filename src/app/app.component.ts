import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoginService} from "./providers/login.service";
import {AuthService} from "./providers/auth.service";
import {Router} from "@angular/router";
import {createConsoleLogServer} from "@ionic/angular-toolkit/builders/cordova-serve/log-server";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  appPages = [
    {
      title: 'Wallet',
      url: '/tabs/wallet',
      icon: 'wallet'
    },
    {
      title: 'Promotions',
      url: '/tabs/promo',
      icon: 'pricetags'
    },
    {
      title: 'Map',
      url: '/tabs/map',
      icon: 'map'
    },
    {
      title: 'QR Code',
      url: '/tabs/qr',
      icon: 'qr-code'
    }
  ];

  loggedIn = false;
  isLogged: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    //   this.loginService.authenticationState.subscribe(state =>{
    //     if (state) {
    //       console.log('login OK')
    //     } else {
    //       console.log('login FALSE')
    //       this.router.navigateByUrl('/login')
    //     }
    //   })
    });
  }

  ionViewDidEnter(){
    this.isLogged = this.authService.isAuthenticated();
    console.log('1');
  }

  ionViewWillEnter(){
    this.isLogged = this.authService.isAuthenticated();
    console.log('2');
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
    console.log('3');
    // this.loginService.login("adam", "adam123")
  }

  logout() {
    this.loginService.logout();
  }
}
