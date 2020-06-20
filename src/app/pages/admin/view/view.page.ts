import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {UserService} from "../../../providers/user.service";

@Component({
    selector: 'app-view',
    templateUrl: './view.page.html',
    styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

    @ViewChild('cardsList', {static: true}) cardList: IonList;

    ios: boolean;
    segment = 'allUsers';
    companies: any[];
    companies1: any[];
    users: any[];
    users1: any[];
    user: any[];


    constructor(
        public config: Config,
        public companiesService: AllCompaniesService,
        public userService: UserService,
    ) {
    }

    ionViewDidEnter() {
        this.ios = this.config.get('mode') === 'ios';
        this.getCompanies();
        this.getUsers();
        this.companies = this.companies1;
        this.users = this.users1;
    }

    ngOnInit() {
        this.getCompanies()
        this.getUsers()
    }

    getCompanies() {
        this.companiesService.getCompanies().subscribe(
            response => {
                this.companies1 = response;
                this.companies = response;
            }
        );
    }

    getUsers() {
        this.userService.getAllUsers().subscribe(
            response => {
                this.users1 = response;
                this.users = response;
            }
        );
    }

    getCompaniesItems(ev: any) {
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

    getUserItems(ev: any) {
        this.users = this.users1;

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.users = this.users.filter((item) => {
                return (item['username'].toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

}
