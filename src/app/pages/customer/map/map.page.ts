import {Component, OnInit} from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {Config} from "@ionic/angular";
import {AllCompaniesService} from "../../../providers/allCompanies.service";
import {HttpClient} from "@angular/common/http";

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage {

    map: any;

    @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

    infoWindows: any = [];
    markers: any = [
        {
            "id": "2ad65f42-758f-4868-84a5-b5a970977538",
            companyName: "Great company",
            "city": "Krakow",
            "zipCode": "12-345",
            "street": "Florianska",
            "localNumber": 17,
            longitude: "19.939988",
            latitude: "50.062938",
        },
        {
            "id": "7a3d05c7-0cf2-46e5-90c4-2f7748c45c9e",
            companyName: "Even better than great company",
            "city": "Krakow",
            "zipCode": "31-877",
            "street": "Os Avia",
            "localNumber": 3,
            longitude: "20.004029",
            latitude: "50.079930"

        },
        {
            "id": "3e9945fd-3f9d-4ce9-a31e-7ed0bb912318",
            companyName: "Turbo awesome company",
            "city": "Krakow",
            "zipCode": "30-364",
            "street": "Pychowicka",
            "localNumber": 18,
            longitude: "19.914740",
            latitude: "50.031895"
        },
        {
            "id": "ec8e82d7-a694-4447-b17d-79302638698b",
            companyName: "Fridge stolen food",
            "city": "Krakow",
            "zipCode": "31-043",
            "street": "Stolarska",
            "localNumber": 9,
            longitude: "19.961411",
            latitude: "50.048428"
        }
    ];


    constructor(
        public config: Config,
        public companiesService: AllCompaniesService,
        private http: HttpClient
    ) {
    }


    ionViewDidEnter() {
        // this.getCompanies();

        this.showMap();
        // this.addMarkersToMap();
    }

    addMarkersToMap() {
        for (let marker of this.markers) {
            let position = new google.maps.LatLng(marker.latitude, marker.longitude);
            let mapMarker = new google.maps.Marker({
                position: position,
                title: marker.companyName,
                latitude: marker.latitude,
                longitude: marker.longitude
            });
            mapMarker.setMap(this.map);
            this.addInfoWindowToMarker(mapMarker)
        }
    }

    addInfoWindowToMarker(marker) {
        var infoWindowContent = '<div id= "content"' +
            '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
            '<p>Latitude: ' + marker.latitude + '</p>' +
            '<p>Longitude: ' + marker.longitude + '</p>' +
            '</div>';

        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
        });
        this.infoWindows.push(infoWindow);
    }

    closeAllInfoWindows() {
        for (let window of this.infoWindows) {
            window.close();
        }
    }

    showMap() {
        // const location = new google.maps.LatLng(51.9189, 19.1344);
        const location = new google.maps.LatLng(50.048428, 19.961411);
        const options = {
            center: location,
            zoom: 11,
            // zoom: 6,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarkersToMap();
    }

    getCompanies() {
        this.companiesService.getCompanies().subscribe(
            response => {
                this.markers = response,
                    this.markers = Array.of(this.markers);
            }
        );
    }

}
