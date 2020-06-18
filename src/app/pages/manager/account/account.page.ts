import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {UserService} from "../../../providers/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user:any = [];
  userDetails = [];

  constructor(public loginService: LoginService,
              public userService: UserService
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loginService.getUserById(this.loginService.userId).subscribe(response => {
      this.user = response;
      this.userDetails = response['userSpecifics'];
    });

  }

}
