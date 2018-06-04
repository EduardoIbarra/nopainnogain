import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

declare var OpenPay: any;

@IonicPage()
@Component({
    selector: 'page-add-card',
    templateUrl: 'add-card.html',
})
export class AddCardPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCardPage');
    }

    addCard() {
        let form = document.getElementById('customer-form');
        console.log(form);

        OpenPay.token.extractFormAndCreate('customer-form', success, error);

        function success(data) {
            console.log(data);
        }

        function error(error) {
            console.log(error);
        }

    }
}
