import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../providers/login.service";
import {StatService} from "../../../providers/stat.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {

  usersCount: any;
  companiesCount: any;
  customersCount: any;
  stampCardsCount: any;

  constructor(private loginService: LoginService,
              private statService: StatService) { }

  ngOnInit() {
    this.getAllStatistic();
    // this.getALL().finally(() => this.getCustomersCount())
  }

  ionViewDidEnter() {
    this.loginService.loginDismiss();
  }

  getAllStatistic(){
    this.getUsersCount()
    this.getCompaniesCount()
    this.getStampCardCount()
    setTimeout(() =>{
    this.getCustomersCount()
    }, 1000)
  }

  getUsersCount(): any{
    this.statService.getUsers().subscribe(data =>{
      this.usersCount = data.length;
    })
  }

  getCompaniesCount(): any{
    this.statService.getCompanies().subscribe(data =>{
      this.companiesCount = data.length;
    })
  }

  getCustomersCount(){
    this.customersCount = parseInt(this.usersCount) - parseInt(this.companiesCount) - 1;
  }

  async getALL(){
    await this.statService.getUsers().subscribe(data =>{
      this.usersCount = data.length;
    })
    await this.statService.getCompanies().subscribe(data =>{
      this.companiesCount = data.length;
    })
    this.getStampCardCount();

  }

  getStampCardCount(){
    this.statService.getStampCards().subscribe(data =>{
      this.stampCardsCount = data.length;
    })
  }

}
