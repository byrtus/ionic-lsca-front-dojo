import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {AllCompaniesService} from "../../../providers/allCompanies.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {
  private userId: string;
  stampCardCount: any;

  constructor(
      private loginService: LoginService,
      private allCompaniesService : AllCompaniesService
  ) { }

  ionViewDidEnter() {
    this.userId = this.loginService.userId;
    this.loginService.loginDismiss();
    this.getCountOfUseCompanyStampCard()
    setTimeout(()=>{
      this.getCountOfUseCompanyStampCard()
    },1000)
    //TODO
  }
  
  ngOnInit() {
  }

  getCountOfUseCompanyStampCard(){
    console.log(this.allCompaniesService.getCountOfUseCompanyStampCard(this.userId));
    setTimeout(()=>{
      this.stampCardCount = this.allCompaniesService.countStampCardsProgresses
    },1000)
    //TODO
  }

}
