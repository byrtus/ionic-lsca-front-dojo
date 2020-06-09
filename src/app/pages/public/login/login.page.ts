import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {NgForm} from '@angular/forms';
import {AuthService} from "../../../providers/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string = '';
  password: string = '';

  constructor(
      private loginService: LoginService,
      protected router: Router
  ) {  }

  ngOnInit() {
    // this.loginService.logout();
  }


  onSubmit(f: NgForm) {
    console.log(f.value);
    this.loginService.login(f.value.login, f.value.password);
    // this.router.navigateByUrl('/tabs/wallet', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/tabs/wallet']);
    // });
  }
}
