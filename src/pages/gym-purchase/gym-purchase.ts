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
    selectedCard: any;

    // openpay = new this.sharedService.OpenPay('mrtezzirtht6piewm54o', 'pk_c0a63b5356524d2095a0df7172965ed9');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingService: LoadingService,
                public sharedService: SharedService,) {

    }

    purchase() {
        this.loadingService.presentLoading();
        console.log(this.selectedCard);
        setTimeout(() => {
            this.isPurchaseDone = true;
            this.loadingService.dismiss();
        }, 1500)
    }

    addCardPage() {
        this.navCtrl.push('AddCardPage')
    }

    ionViewWillEnter() {
        if (this.sharedService.UserData.Cards) {
            this.cards = this.sharedService.UserData.Cards;
            this.selectedCard = this.cards[0];
        }
        console.log(this.cards);
    }

}
