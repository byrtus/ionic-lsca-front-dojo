import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../../../providers/user.service";
import {LoginService} from "../../../providers/login.service";


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
    companies1: any[];
    user: any;
    userId: string;


    constructor(
        public config: Config,
        public companiesService: AllCompaniesService,
        public userService: UserService,
        private http: HttpClient,
        private loginService: LoginService
    ) {
        this.getCompanies();
    }

    ionViewDidEnter() {
        this.loginService.loginDismiss();
        this.getCompanies();
        this.userId = this.loginService.userId;
        this.companies = this.companies1; //must be
        this.getUser();
        this.ios = this.config.get('mode') === 'ios';
    }

    ngOnInit() {
        this.getCompanies()
        // this.companies = this.companies1; //must be
        // this.ios = this.config.get('mode') === 'ios';
    }


    getCompanies() {
        this.companiesService.getCompanies().subscribe(
            response => {
                this.companies1 = response;
                this.companies = response;
            }
        );
    }


    private getUser() {
        this.userService.getUserById(this.userId).subscribe(
            response => this.user = response
        );
    }

    getItems(ev: any) {
        this.companies = this.companies1;

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.companies = this.companies.filter((item) => {
                return (item['companyName'].toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
}
