import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {NgForm} from '@angular/forms';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string = '';
  password: string = '';
  private loading;

  constructor(
      private loginService: LoginService,
      private loadingCtrl : LoadingController
  ) {  }

  ngOnInit() {
    // this.loginService.logout();
  }


  onSubmit(f: NgForm) {
    console.log(f.value);

    this.loadingCtrl.create({
      message: 'Authentication...',
      spinner: "bubbles"
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
      this.loginService.login(f.value.login, f.value.password);
    }).finally(() =>{
      setTimeout(() =>{
      this.loading.dismiss();
      }, 1000)
    })

    setTimeout(() =>{
      // this.loginService.login(f.value.login, f.value.password);
      // this.loading.dismiss();
    }, 0)

    // this.router.navigateByUrl('/tabs/wallet', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/tabs/wallet']);
    // });
  }
}
