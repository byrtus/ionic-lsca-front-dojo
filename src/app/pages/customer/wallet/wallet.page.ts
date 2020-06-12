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
    user: any;
    userId: string;


    constructor(
        public config: Config,
        public companiesService: AllCompaniesService,
        public userService: UserService,
        private http: HttpClient,
        private loginService: LoginService
    ) {
    }

    ionViewDidEnter(){
        this.userId = this.loginService.userId;
        this.getCompanies();
        this.getUser();
        this.ios = this.config.get('mode') === 'ios';
    }

    ngOnInit() {
        // this.userId = this.loginService.userId;
        // this.getCompanies();
        // this.getUser();
        // this.ios = this.config.get('mode') === 'ios';
    }

    // ionViewDidEnter(){
    //     this.loginService.authenticationState.subscribe(state =>{
    //         if (state) {
    //             console.log('login OK')
    //             this.updateSchedule();
    //             this.getCompanies();
    //             this.getUser();
    //             this.ios = this.config.get('mode') === 'ios';
    //         } else {
    //             console.log('login FALSE')
    //             this.router.navigateByUrl('/login')
    //         }
    //     })
    // }


    getCompanies() {
        this.companiesService.getCompanies().subscribe(
            response => this.companies = response
        );
    }


    private getUser() {
        this.userService.getUserById(this.userId).subscribe(
            response => this.user = response
        );
    }
}
