import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
import {LoginService} from "../../../providers/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Wallet',
      url: '/menu/wallet',
      icon: 'wallet'
    },
    {
      title: 'Recent',
      url: '/menu/promo',
      icon: 'pricetags'
    },
    {
      title: 'Map',
      url: '/menu/map',
      icon: 'map'
    },
    {
      title: 'QR Code',
      url: '/menu/qr',
      icon: 'qr-code'
    }
  ];

  selectedPatch = '';

  constructor(private router: Router,
              private loginService: LoginService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url){
        this.selectedPatch = event.url;
      }
    });
  }

  logOut(){
    this.loginService.logout();
  }

  ngOnInit() {
  }

}
