import { Component, OnInit } from '@angular/core';
import {Config} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {RegisterService} from "../../../providers/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ios: boolean;
  segment = 'userRegister';

  constructor(
      public config: Config,
      private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ios = this.config.get('mode') === 'ios';
  }


  userRegister(userForm: NgForm) {
    this.registerService.customerRegister(userForm.value.userName, userForm.value.password, userForm.value.firstName, userForm.value.lastName, userForm.value.email);
    console.log(userForm.value);
  }

  companyRegister(companyForm: NgForm) {
    this.registerService.managerRegister(companyForm.value.userName, companyForm.value.password, companyForm.value.firstName, companyForm.value.lastName, companyForm.value.email, companyForm.value.companyName, companyForm.value.city, companyForm.value.zipCode, companyForm.value.street, companyForm.value.localNumber )
    console.log(companyForm.value);
  }
}