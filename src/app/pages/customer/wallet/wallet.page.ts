import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const apiUrl = 'https://loyalty-card-stamp-app.herokuapp.com';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  @ViewChild('cardsList', { static: true }) cardList: IonList;

  ios: boolean;
  segment = 'myCards';
  groups: any = [];
  myjason: any = null;
  private data: any;

  constructor(
      public config: Config,
      public companiesService: AllCompaniesService,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }

  allCompanies(){
    this.companiesService.getAllCompanies()
  }


  updateSchedule() {
    // Close any open sliding items when the schedule updates
    // if (this.scheduleList) {
    //   this.scheduleList.closeSlidingItems();
    // }
    //
    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    // });
  }


  getSelectOptions(): Observable<string[]> {
    this.myjason = this.http.get<string[]>(`${apiUrl}/api/companies`)
        .pipe();
    console.log(this.myjason)
    return this.http.get<string[]>(`${apiUrl}/api/companies`)
        .pipe();
  }

  getSelectOptions2(){
    this.myjason = this.http.get<string[]>(`${apiUrl}/api/companies`)
        .subscribe(data => {
          this.data = data;

        }, err=> {
        });
    console.log(this.data)
    return this.http.get<string[]>(`${apiUrl}/api/companies`)
        .pipe();
  }



}
