import {Component, OnInit} from '@angular/core';
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
            title: 'Statistics',
            url: '/menu/stat',
            icon: 'stats-chart'
        },
        {
            title: 'Stamp Card',
            url: '/menu/stamp-card',
            icon: 'albums'
        },
        {
            title: 'QR Code',
            url: '/menu/Qr',
            icon: 'qr-code'
        }
    ]

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
