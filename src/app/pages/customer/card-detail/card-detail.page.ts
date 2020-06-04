import {Component, OnInit} from '@angular/core';
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {ActivatedRoute} from "@angular/router";
import {Config} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
    passedId = null;
    company: any[];
    rewards: any[]

    constructor(
        public config: Config,
        private http: HttpClient,
        private route: ActivatedRoute,
        public companiesService: AllCompaniesService,
    ) {
    }


    ngOnInit() {
        this.passedId = this.route.snapshot.paramMap.get('companyId');
        this.getCard();


    }

getCard(){
    this.companiesService.getCompanyById(this.passedId).subscribe(
        response => {
            this.company = response;
            this.company = Array.of(this.company);
        }
    );
}

    // getRewards(){
    //     this.rewards = this.company[0][3];
    // }

}
