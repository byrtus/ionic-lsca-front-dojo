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
      url: '/menu/statsA',
      icon: 'stats-chart'
    },
    {
      title: 'All View',
      url: '/menu/view',
      icon: 'grid'
    },
    {
      title: 'Administration',
      url: '/menu/administrate',
      icon: 'construct'
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
