import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
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
  user: any;
  //Open_pay = require('openpay');
//instantiation
  //openpay = new this.Open_pay();

  openpay = new this.sharedService.OpenPay('mrtezzirtht6piewm54o', 'pk_c0a63b5356524d2095a0df7172965ed9');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public paymentService: PaymentService,
              public authService: AuthService,
              public modalCtrl: ModalController,
              public loadingService: LoadingService,
              public sharedService: SharedService,
              public usersService: UsersService) {

    this.viewCtrl = navParams.get('viewCtrl');
    this.gym = navParams.get('gym');
    this.isModal = navParams.get('isModal');
    this._viewCtrl.showBackButton(false);

    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      this.usersService.getUserById(this.currentUser.uid).valueChanges().subscribe((data) => {
        this.user = data;
        if(this.user.cards) {
          this.user.cards = Object.keys(this.user.cards).map(key => this.user.cards[key]);
          this.cards = this.user.cards;
          console.log(this.cards);
          this.selectedCard = this.cards.find((c) => {return c.card.default}) || this.cards[0];
        }
      }, (error) => {
        console.log(error);
      });
    });

  }

  purchase() {
      let alert = this.alertCtrl.create({
          title: 'CVV',
          inputs: [
              {
                  name: 'card_cvv',
                  placeholder: 'CVV',
                  type: 'password',
                  id: 'maxLength5'
              }
          ],
          buttons: [
              {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Aceptar',
                  handler: data => {
                      if (data.card_cvv !== '') {
                          this.loadingService.presentLoading();
                          this.selectedCard.card.card_cvv = data.card_cvv;
                          console.log('cvv');
                          console.log(this.sharedService.UserData);
                          alert.dismiss();
                          this.paymentService.GymPayment(this.selectedCard, this.user, this.gym.CostoIva).subscribe((response) => {
                              console.log(response);
                              let payment: any = {
                                  id: response.id,
                                  authorization: response.authorization,
                                  amount: this.gym.CostoIva || '40',
                                  generated_code: this.sharedService.generateCode(),
                                  gym: this.gym.id,
                                  status: 'available',
                                  timestamp: Math.round((new Date()).getTime()),
                                  uid: this.sharedService.UserData.uid
                              };
                              console.log('payment');
                              console.log(payment);
                              this.generated_code = payment.generated_code;
                              this.paymentService.createPayment(this.currentUser.uid, payment.generated_code, payment).then((response) => {
                                  console.log(response);
                                  this.isPurchaseDone = true;
                              }, (error) => {
                                  console.log('error');
                                  console.log(error);
                                  this.isPurchaseDone = true;
                              });
                              this.loadingService.dismiss();
                          }, (error) => {
                              console.log(error);
                              this.loadingService.dismiss();
                          });
                          return true;
                      } else {
                          return false;
                      }
                  }
              }
          ]
      });
      alert.present().then(result =>{document.getElementById('maxLength5').setAttribute('maxlength','4');});
    console.log(this.selectedCard);
    console.log('user');
    console.log(this.sharedService.UserData);

      /*this.payPal.init({
          PayPalEnvironmentProduction: 'ATmTjuHMPpI_6Prs8xojHAY9OEmIkbIwwMq3UW46o8wxvnT0WE_RJ5rse5AaTjN7DABgpSVqWJ4RqdwI',
          PayPalEnvironmentSandbox: 'Af4NsUtFqkJkiB6abUL4n-F8Sf_d63u2XXYi4hzCBB6xD-izAF0rH4RCsjwMXxqEAriBfuQwUgvsl5Tt'
      }).then(() => {
          this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({

          })).then(() => {
              let payment = new PayPalPayment('1', 'MXN', this.gym.gym_description, 'sale');
              this.payPal.renderSinglePaymentUI(payment).then((success) => {
                  console.log(success);
                  let payment: any = {
                      transaction_id: success.response.id,
                      transaction_state: success.response.state,
                      amount: this.gym.CostoIva || '20',
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
                  });
                  this.loadingService.dismiss();
              }, () => {
                  // Error or render dialog closed without being successful
                  console.log('error paypal');
                  this.loadingService.dismiss();
              });
          }, () => {
              // Error in configuration
              console.log('error configuration paypal');
              this.loadingService.dismiss();
          });
      }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
          console.log('error last paypal');
          this.loadingService.dismiss();
      });*/

  }

  addCardPage() {
    let modal = this.modalCtrl.create('AddCardPage', {isModal: true});
    modal.present();
    // this.navCtrl.push('AddCardPage');
  }

  ionViewWillEnter() {
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
        if (!pos && pos !== 0) return;
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
