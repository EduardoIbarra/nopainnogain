import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { GymService } from '../../../services/gym.service';
import { ScanService } from '../../../services/scan.service';

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
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthService, public paymentService: PaymentService, public gymService: GymService, public scanService: ScanService) {
      this.authService.getStatus().subscribe((result) => {
        this.currentUser = result;
        console.log(result);
      });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SessionCodePage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    validateCode() {
      const stream = this.paymentService.getPayment(this.currentUser.uid, this.code).valueChanges().subscribe((payment) => {
        this.payment = payment;
        if(this.payment && this.payment.status == 'available'){
          this.gymService.getGym(this.payment.gym).valueChanges().subscribe((gym) => {
            this.gym = gym;
            this.validationStep++;
            stream.unsubscribe();
          });
        }else{
          alert('El código ingresado no es válido o ya había sido usado anteriormente.');
        }
      });
    }

    acceptCode(){
      const scan = {
        gym: this.gym.id,
        scanned_code: this.code,
        timestamp: Date.now(),
        uid: this.currentUser.uid
      };
      this.scanService.createScan(scan).then( () => {
        this.paymentService.setPaymentProperty(this.currentUser.uid, this.code, 'status', 'used').then((result) => {
          this.validationStep++;
        }).catch((error) => {
          alert('Ocurrió un error al tratar de usar tu código' + error);
          console.log(error);
        });
      }).catch((error) => {
        alert('Ocurrió un error al tratar de usar tu código' + error);
        console.log(error);
      });
    }
}
