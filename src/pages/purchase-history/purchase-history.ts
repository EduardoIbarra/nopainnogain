import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PaymentService} from "../../services/payment.service";
import {AuthService} from "../../services/auth.service";
import {GymService} from "../../services/gym.service";
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";

@IonicPage()
@Component({
  selector: 'page-purchase-history',
  templateUrl: 'purchase-history.html',
})
export class PurchaseHistoryPage {

  currentUser: any;
  history: any = [];
  items: any = [
    {isOpen: false, avatar: 'assets/img/example/bonga.jpg', name: 'Bonga GYM', price: '78.00', date: 'Martes 17 de Agosto. 07:32 Hrs'},
    {isOpen: false, avatar: 'assets/img/example/snap.jpg', name: 'Snap Fitness', price: '55.00', date: 'Viernes 19 de Mayo. 15:03 Hrs'},
    {isOpen: false, avatar: 'assets/img/example/olympia.jpg', name: 'Olympia GYM', price: '65.00', date: 'Lunes 17 de Abril. 06:55 Hrs'},
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentService: PaymentService,
    public gymService: GymService,
    public sharedService: SharedService,
    public loadingService: LoadingService,
    public authService: AuthService,
  ) {
    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
    });
  }

  ionViewDidLoad() {
    this.getPayments();
  }

  getPayments() {
    this.loadingService.presentLoading();
    this.paymentService.getPaymentsByUser(this.currentUser.uid).valueChanges().subscribe((payments: any) => {
      console.log(payments);
      payments = Object.keys(payments).map(key => payments[key]);
      this.gymService.getGyms().valueChanges().subscribe((gyms: any) => {
        console.log(gyms);
        payments.map((p) => {
          gyms.forEach((g) => {
            if (p.gym === g.id) {
              this.history.push(g);
              this.history[this.history.length - 1].purchase_code = p.generated_code;
              this.history[this.history.length - 1].status = p.status;
              this.history[this.history.length - 1].purchase_price = p.amount;
              this.history[this.history.length - 1].purchase_date = p.timestamp;
              this.history[this.history.length - 1].isOpen = false;
              this.history[this.history.length - 1].openToday = this.sharedService.getGymOpenDays(g);
            }
          })
        });

        this.loadingService.dismiss();

        console.log(this.history);
      })
    }, (error) => {
      this.loadingService.dismiss();
      console.log(error);
    })
  }

}
