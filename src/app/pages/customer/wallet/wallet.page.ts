import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../../../providers/user.service";

const userId = '5ee737bd-d1bf-49c5-980c-fbff563e3315';


@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.page.html',
    styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

    @ViewChild('cardsList', {static: true}) cardList: IonList;

    ios: boolean;
    segment = 'myCards';
    groups: any = [];
    private data: any;
    companies: any[];
    user: any;


    constructor(
        public config: Config,
        public companiesService: AllCompaniesService,
        public userService: UserService,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.updateSchedule();
        this.getCompanies();
        this.getUser();
        this.ios = this.config.get('mode') === 'ios';
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

    getCompanies() {
        this.companiesService.getCompanies().subscribe(
            response => this.companies = response
        );
    }


    private getUser() {
        this.userService.getUserById(userId).subscribe(
            response => this.user = response
        );
    }
}
