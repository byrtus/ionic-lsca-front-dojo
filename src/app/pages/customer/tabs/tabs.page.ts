import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
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

  constructor() {}

  logout() {

  }
}
