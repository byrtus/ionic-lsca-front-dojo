import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery, Base64ToGalleryOptions} from '@ionic-native/base64-to-gallery/ngx';
import {ToastController} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions';
import {LoginService} from "../../../providers/login.service";
import {AllCompaniesService} from "../../../providers/allCompanies.service";

@Component({
    selector: 'app-qr',
    templateUrl: './qr.page.html',
    styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

    @ViewChild('userQRCode', {static: true}) userQRCode: IonList;

    qrData: string;
    ios: boolean;
    segment = 'scanQR';
    groups: any = [];
    scannedCode = null;
    elementType: 'url' | 'canvas' | 'img' = 'canvas';
    hasWriteAccess = false;
    userId: any;
    stampCardId: any;
    companyId: any;
    customerId = null;
    userType = null;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private base64ToGallery: Base64ToGallery,
        private toastCtrl: ToastController,
        public config: Config,
        private loginService: LoginService,
        private companiesService: AllCompaniesService
    ) {
    }

    ionViewDidEnter() {
        this.qrData = 'companyID: ' + this.loginService.userId;
        this.userId = this.loginService.userId;
    }

    ngOnInit() {
        // this.qrData = this.qrData + this.loginService.userId;
        this.ios = this.config.get('mode') === 'ios';
        this.checkPermissions();
        setTimeout(() => {
            this.getStampCardId();
        }, 500)
    }


    scanCode() {
        this.barcodeScanner.scan().then(
            barcodeData => {
                this.scannedCode = barcodeData.text;
                this.customerId = barcodeData.text.split(' ')[1];
                this.userType = barcodeData.text.split(' ')[0]
            }
        ).then(() => {
            this.companiesService.addStampForUser(this.customerId, this.stampCardId, this.userType )
        });
    }
    // test() {
    //     this.companiesService.addStampForUser('078dd1ea-d207-4ee5-89ed-c50483775c9a', 'a413fed1-c4ad-4317-8e5c-beb68df3adc0', 'userId:' )
    // }

    checkPermissions() {
        const permissions = AndroidPermissions;
        permissions
            .checkPermission(permissions
                .PERMISSION.WRITE_EXTERNAL_STORAGE)
            .then((result) => {
                console.log('Has permission?', result.hasPermission);
                this.hasWriteAccess = result.hasPermission;
            }, (err) => {
                permissions
                    .requestPermission(permissions
                        .PERMISSION.WRITE_EXTERNAL_STORAGE);
            });
        if (!this.hasWriteAccess) {
            permissions
                .requestPermissions([permissions
                    .PERMISSION.WRITE_EXTERNAL_STORAGE]);
        }

        return permissions;
    }

    downloadQR() {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        const imageData = canvas.toDataURL('image/jpeg').toString();
        console.log('data: ', imageData);

        const data = imageData.split(',')[1];

        if (!this.hasWriteAccess) {
            this.checkPermissions();
        }
        const options: Base64ToGalleryOptions = {
            prefix: '_img',
            mediaScanner: true
        };
        this.base64ToGallery
            .base64ToGallery(data, options).then(async res => {
                const toast = await this.toastCtrl.create({

                    duration: 3000,
                    header: 'QR Code saved in your Photo library'
                });
                toast.present();
            }, err => console.log('err: ', err)
        );
    }

    getStampCardId() {
        this.companiesService.getCompanyUserById(this.userId).subscribe(response => {
            this.companyId = response['userSpecifics']['company']['id']
        })
        setTimeout(() => {
            this.companiesService.getCompanyById(this.companyId).subscribe(data => {
                this.stampCardId = data['stampCard']['id'];
            })
        }, 500)
    }
}
