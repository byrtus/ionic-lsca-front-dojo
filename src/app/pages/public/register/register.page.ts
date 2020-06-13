import { Component, OnInit } from '@angular/core';
import {Config} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ios: boolean;
  segment = 'userRegister';

  constructor(
      public config: Config
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ios = this.config.get('mode') === 'ios';
  }

}
