import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';
import {LoginService} from "./providers/login.service";
import {HttpClientModule} from "@angular/common/http";
import {AllCompaniesService} from "./providers/allCompanies.service";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        BarcodeScanner,
        Base64ToGallery,
        HttpClientModule,
        LoginService,
        AllCompaniesService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
