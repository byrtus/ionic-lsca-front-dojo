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
  adminCount: any;
  stampCardsCount: any;

  constructor(private loginService: LoginService,
              private statService: StatService) { }

  ngOnInit() {
    this.getAllStatistic();
  }

  ionViewDidEnter() {
    this.loginService.loginDismiss();
  }

  getAllStatistic(){
    this.getUsersCount()
    this.getCompaniesCount()
    this.getStampCardCount()
    this.getCustomersCount()
    this.getAdminCount()
  }

  getUsersCount(): any{
    this.statService.getUsers().subscribe(data =>{
      this.usersCount = data.length;
    })
  }

  getCompaniesCount(): any{
    this.statService.getUserByType('manager').subscribe(data =>{
      this.companiesCount = data.length
    })
  }

  getCustomersCount(){
    this.statService.getUserByType('user').subscribe(data =>{
      this.customersCount = data.length
    })
  }

  getAdminCount(){
    this.statService.getUserByType('admin').subscribe(data =>{
      this.adminCount = data.length
    })
  }


  getStampCardCount(){
    this.statService.getStampCards().subscribe(data =>{
      this.stampCardsCount = data.length;
    })
  }

}
