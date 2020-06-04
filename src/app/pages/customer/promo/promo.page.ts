import { Component, OnInit } from '@angular/core';
import {Config} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {

  companies: any[];

  constructor(
      public config: Config,
      public companiesService: AllCompaniesService,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
        response => this.companies = response
    );
  }
}
