import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {UserService} from "../../../providers/user.service";

@Component({
  selector: 'app-stamp-card',
  templateUrl: './stamp-card.page.html',
  styleUrls: ['./stamp-card.page.scss'],
})
export class StampCardPage implements OnInit {

  user: any[];
  userId: string;

  constructor(
      private loginService: LoginService,
      public userService: UserService,
  ) { }

  ionViewDidEnter() {
    this.userId = this.loginService.userId;
    this.getUser();
  }

  private getUser() {
    this.userService.getUserById(this.userId).subscribe(
        response => this.user = response
    );
  }

  ngOnInit() {
  }

}
