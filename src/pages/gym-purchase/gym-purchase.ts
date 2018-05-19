import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";


@IonicPage()
@Component({
    selector: 'page-gym-purchase',
    templateUrl: 'gym-purchase.html',
})
export class GymPurchasePage {

    isPurchaseDone: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingService: LoadingService,) {
    }

    purchase() {
        this.loadingService.presentLoading();

        setTimeout(() => {
            this.isPurchaseDone = true;
            this.loadingService.dismiss();
        }, 1500)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GymPurchasePage');
    }

}
