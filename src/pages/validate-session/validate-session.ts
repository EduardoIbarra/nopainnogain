import {Component} from '@angular/core';
import {IonicPage, ModalCmp, ModalController, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {PaymentService} from "../../services/payment.service";
import {AuthService} from "../../services/auth.service";
import {AlertService} from "../../services/alert.service";
import {GymService} from "../../services/gym.service";
import {SharedService} from "../../services/shared.service";

@IonicPage()
@Component({
  selector: 'page-validate-session',
  templateUrl: 'validate-session.html',
})
export class ValidateSessionPage {
  currentUser: any;
  payment: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public authService: AuthService,
    public gymService: GymService,
    public alertService: AlertService,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    public modalCtrl: ModalController) {

    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValidateSessionPage');
    this.generateQrCode()
  }

  generateQrCode() {
    this.paymentService.generateQrCode(this.sharedService.generateCode()).subscribe((response) => {
      console.log(response);
    })
  }


  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ' + barcodeData.text);
      this.validateCode(barcodeData.text)
    }).catch(err => {
      console.log(err);
    });
  }

  showModalCode() {
    let modal = this.modalCtrl.create('SessionCodePage');
    modal.present();
  }

  validateCode(code) {
    const stream = this.paymentService.getPayment(this.currentUser.uid, code).valueChanges().subscribe((payment) => {
      this.payment = payment;
      if (this.payment && this.payment.status == 'available') {
        this.gymService.getGym(this.payment.gym).valueChanges().subscribe((gym) => {
          this.modalCtrl.create('SessionCodePage', {code: code, gym: gym}).present();
          stream.unsubscribe();
        });
      } else {
        this.alertService.validateCodeError()
      }
    });
  }

}
