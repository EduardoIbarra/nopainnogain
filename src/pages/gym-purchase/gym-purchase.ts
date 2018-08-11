import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";
import {AuthService} from "../../services/auth.service";
@IonicPage()
@Component({
  selector: 'page-gym-purchase',
  templateUrl: 'gym-purchase.html',
})
export class GymPurchasePage {

  isPurchaseDone: boolean = false;
  cards: any = [];
  selectedCard: any;
  viewCtrl: any;
  gym: any;
  currentUser: any;
  generated_code: any;
  isModal: boolean;
  // openpay = new this.sharedService.OpenPay('mrtezzirtht6piewm54o', 'pk_c0a63b5356524d2095a0df7172965ed9');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public paymentService: PaymentService,
              public authService: AuthService,
              public modalCtrl: ModalController,
              public loadingService: LoadingService,
              public sharedService: SharedService,) {

    this.viewCtrl = navParams.get('viewCtrl');
    this.gym = navParams.get('gym');
    this.isModal = navParams.get('isModal');
    this._viewCtrl.showBackButton(false);

    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
    });

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

    let payment: any = {
      amount: this.gym.monthly_cost || '20',
      generated_code: this.sharedService.generateCode(),
      gym: this.gym.id,
      status: 'available',
      timestamp: Math.round((new Date()).getTime())
    };
    this.generated_code = payment.generated_code;
    this.paymentService.createPayment(this.currentUser.uid, payment.generated_code, payment).then((response) => {
      console.log(response);
      this.isPurchaseDone = true;
    }, (error) => {
      console.log(error);
      this.isPurchaseDone = true;
    })

  }

  addCardPage() {
    let modal = this.modalCtrl.create('AddCardPage', {isModal: true});
    modal.present();
    // this.navCtrl.push('AddCardPage');
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

  dismiss() {
    this.navCtrl.pop();
  }
  dismiss2() {
    this.navCtrl.pop();
    this.viewCtrl.dismiss();
  }
}
