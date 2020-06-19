import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {
  private userId: string;

  constructor(
      private loginService: LoginService,
  ) { }

  ionViewDidEnter() {
    this.userId = this.loginService.userId;
    this.loginService.loginDismiss();
  }
  
  ngOnInit() {
  }

}
