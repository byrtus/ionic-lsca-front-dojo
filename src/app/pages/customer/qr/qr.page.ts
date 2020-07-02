import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, IonList} from "@ionic/angular";
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery, Base64ToGalleryOptions} from '@ionic-native/base64-to-gallery/ngx';
import {ToastController} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions';
import {LoginService} from "../../../providers/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../../providers/user.service";
import {timeout} from "rxjs/operators";

@Component({
    selector: 'app-qr',
    templateUrl: './qr.page.html',
    styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

    @ViewChild('userQRCode', {static: true}) userQRCode: IonList;

    qrData: string;
    ios: boolean;
    segment = 'myQR';
    groups: any = [];
    scannedCode = null;
    elementType: 'url' | 'canvas' | 'img' = 'canvas';
    hasWriteAccess = false;
    companyId: null;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private base64ToGallery: Base64ToGallery,
        private toastCtrl: ToastController,
        public config: Config,
        private loginService: LoginService,
        private router: Router,
        private userService: UserService
    ) {
    }

    ionViewDidEnter() {
        this.qrData = 'userID: ' + this.loginService.userId;
    }

    ngOnInit() {
        // this.qrData = this.qrData + this.loginService.userId;
        this.ios = this.config.get('mode') === 'ios';
        this.checkPermissions();
    }


    scanCode() {
        this.barcodeScanner.scan().then(
            barcodeData => {
                this.scannedCode = barcodeData.text.split(' ')[1];

                // this.router.navigateByUrl('/tabs/wallet/card-detail/' + barcodeData.text.split(' ')[1])
            }
        ).then(() => {

            this.userService.getUserById(this.scannedCode).subscribe((data) => {
                this.companyId = data['userSpecifics']['company']['id']
            })
        }).finally(() =>
            setTimeout(()=>{
                this.router.navigateByUrl('/tabs/wallet/card-detail/'+ this.companyId)
            },500)

        );
    }


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
}
