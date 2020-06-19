import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loginService.loginDismiss();
  }

}
