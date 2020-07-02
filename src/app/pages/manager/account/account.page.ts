import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {UserService} from "../../../providers/user.service";
import {NgForm} from "@angular/forms";
import {EditUsersService} from "../../../providers/edit-users.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user:any = [];
  userDetails = [];
  companyDetails = [];
  pass: any;

  constructor(public loginService: LoginService,
              public userService: UserService,
              public editUsersService: EditUsersService
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.pass = this.loginService.pass;
    this.loginService.getUserById(this.loginService.userId).subscribe(response => {
      this.user = response;
      this.userDetails = response['userSpecifics'];
      this.companyDetails = response['userSpecifics']['company'];
    });
  }

  userRegister(companyForm: NgForm) {
    this.editUsersService.companyEdit(companyForm.value.userName, companyForm.value.password, companyForm.value.firstName, companyForm.value.lastName, companyForm.value.email, companyForm.value.companyName, companyForm.value.city, companyForm.value.zipCode, companyForm.value.street, companyForm.value.localNumber, this.loginService.userId)
    console.log(companyForm.value);
  }
}
