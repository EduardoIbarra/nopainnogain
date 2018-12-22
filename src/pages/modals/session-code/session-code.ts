import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthService} from '../../../services/auth.service';
import {PaymentService} from '../../../services/payment.service';
import {GymService} from '../../../services/gym.service';
import {ScanService} from '../../../services/scan.service';
import {AlertService} from "../../../services/alert.service";

@IonicPage()
@Component({
  selector: 'page-session-code',
  templateUrl: 'session-code.html',
})
export class SessionCodePage {
  currentUser: any;
  validationStep: number = 1;
  code: any;
  payment: any;
  gym: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthService,
    public paymentService: PaymentService,
    public gymService: GymService,
    public alertService: AlertService,
    public scanService: ScanService
  ) {
    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
    });
  }

  ionViewDidLoad() {
    this.gym = this.navParams.get('gym') || null;
    this.code = this.navParams.get('code') || null;
    this.validationStep = this.code ? 2 : 1;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  validateCode() {
    if (this.code && this.code.generated_code) {
      this.payment = JSON.parse(JSON.stringify(this.code));
      this.code = JSON.parse(JSON.stringify(this.code.generated_code));
      if (this.payment && this.payment.status == 'available') {
        this.gymService.getGym(this.payment.gym).valueChanges().subscribe((gym) => {
          this.gym = gym;
          this.validationStep++;
        });
      } else {
        this.alertService.validateCodeError()
      }
    } else {
      const stream = this.paymentService.getPayment(this.code).valueChanges().subscribe((payment) => {
        this.payment = payment;
        if (!this.code) return;
        this.payment = payment;
        if (this.payment && this.payment.status == 'available') {
          this.gymService.getGym(this.payment.gym).valueChanges().subscribe((gym) => {
            this.gym = gym;
            this.validationStep++;
            stream.unsubscribe();
          });
        } else {
          this.alertService.validateCodeError()
        }
      });
    }
  }

  doAcceptCode() {
    console.log(this.code);
    const scan = {
      gym: this.gym.id,
      scanned_code: this.code,
      timestamp: Date.now(),
      uid: this.payment.uid
    };
    this.scanService.createScan(scan).then(() => {
      this.paymentService.setPaymentProperty(this.payment.uid, this.code, 'status', 'used').then((result) => {
        this.validationStep++;
      }).catch((error) => {
        this.alertService.acceptCode(this.code.generated_code)
        console.log(error);
      });
    }).catch((error) => {
      this.alertService.acceptCode(this.code.generated_code)
      console.log(error);
    });
  }
  acceptCode() {
    if (!this.payment || !this.payment.uid) {
      this.code = (this.code.generated_code) ? this.code.generated_code : this.code;
      const stream = this.paymentService.getPayment(this.code).valueChanges().subscribe((payment) => {
        this.payment = payment;
        stream.unsubscribe();
        this.doAcceptCode();
      });
    } else {
      this.doAcceptCode();
    }

  }
}
