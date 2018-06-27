import {Component} from '@angular/core';
import {IonicPage, ModalCmp, ModalController, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@IonicPage()
@Component({
    selector: 'page-validate-session',
    templateUrl: 'validate-session.html',
})
export class ValidateSessionPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ValidateSessionPage');
    }

    scanCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data: ' + barcodeData.text);
        }).catch(err => {
            console.log(err);
        });
    }

    showModalCode() {
        let modal = this.modalCtrl.create('SessionCodePage');
        modal.present();
    }

}
