import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";

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
                public alertCtrl: AlertController,
                public paymentService: PaymentService,
                public loadingService: LoadingService,
                public sharedService: SharedService,) {

    }

    purchase() {
        this.loadingService.presentLoading();
        console.log(this.selectedCard);
        this.paymentService.GymPayment(this.selectedCard, this.sharedService.UserData, '22').subscribe((response) => {
            console.log(response);
            this.loadingService.dismiss();
        }, (error) => {
            console.log(error);
            this.loadingService.dismiss();
        });

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

    showCardAlert() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Selecciona Tarjeta');

        this.cards.forEach((c, ci) => {
            alert.addInput({
                type: 'radio',
                label: c.card.brand.toUpperCase() + ' ' + c.card.card_number,
                value: ci,
            });

        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'Seleccionar',
            handler: pos => {
                if (!pos) return;
                this.selectedCard = this.cards[pos];
            }
        });
        alert.present();
    }
}
