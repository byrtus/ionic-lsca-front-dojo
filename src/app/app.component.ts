import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoginService} from "./providers/login.service";
import { Observable } from "rxjs";
import { timer } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  isLogged$: Observable<boolean>;
  showSplash = true;

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
      timer(3000).subscribe(() =>{
        // this.splashScreen.hide();
        this.showSplash = false;
      })
    });
  }

  ngOnInit(): void {
    this.isLogged$ = this.loginService.getIsAuthenticated();
  }

  // logout() {
  //   this.loginService.logout();
  // }
}
