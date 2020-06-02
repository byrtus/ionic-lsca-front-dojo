import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor() {}

  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(51.9189, 19.1344);
    const options = {
      center: location,
      zoom: 6,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  ngOnInit() {
  }

}
