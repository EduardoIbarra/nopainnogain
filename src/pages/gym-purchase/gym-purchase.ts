import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";

declare var OpenPay: any;

@IonicPage()
@Component({
    selector: 'page-gym-purchase',
    templateUrl: 'gym-purchase.html',
})
export class GymPurchasePage {

    isPurchaseDone: boolean = false;
    cards: any = [];

    // openpay = new this.sharedService.OpenPay('mrtezzirtht6piewm54o', 'pk_c0a63b5356524d2095a0df7172965ed9');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingService: LoadingService,
                public sharedService: SharedService,) {
    }

    purchase() {
        this.loadingService.presentLoading();

        setTimeout(() => {
            this.isPurchaseDone = true;
            this.loadingService.dismiss();
        }, 1500)
    }

    addCardPage() {
        this.navCtrl.push('AddCardPage')
    }

    ionViewDidLoad() {



        // var newCharge = {
        //     "method": "card",
        //     "card": {
        //         "card_number": "4111111111111111",
        //         "holder_name": "John Doe",
        //         "expiration_year": "20",
        //         "expiration_month": "12",
        //         "cvv2": "110",
        //     },
        //     "amount": 200.00,
        //     "description": "Service Charge",
        //     "order_id": "oid-00721"
        // };
        //
        // let token = this.openpay.token;
        // console.log(token);
        // this.openpay.charges.create(newCharge, function (error, body) {
        //     console.log(body);
        // });


    }

}
