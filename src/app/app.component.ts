import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoginService} from "./providers/login.service";
import {Observable} from "rxjs";

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


  isLogged$: Observable<boolean>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  ngOnInit(): void {
    this.isLogged$ = this.loginService.getIsAuthenticated();
  }

  logout() {
    this.loginService.logout();
  }
}
