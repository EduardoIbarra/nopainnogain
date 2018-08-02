import {Injectable} from '@angular/core';
import {AlertController, App, NavController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {PaymentService} from "./payment.service";
import {GymService} from "./gym.service";
import {AuthService} from "./auth.service";

// declare var OpenPay: any;
@Injectable()

export class NotificationService {

  Notifications: any = [];
  currentUser: any;
  NotificationsError: boolean;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService,
    private gymService: GymService
  ) {}

  getHistoryToNotifications() {
    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      this.getHistory()
      console.log(result);
    });
  }

  private getHistory(){
    this.paymentService.getPaymentsByUser(this.currentUser.uid).valueChanges().subscribe((payments: any) => {
      payments = Object.keys(payments).map(key => payments[key]);
      this.gymService.getGyms().valueChanges().subscribe((gyms: any) => {
        console.log(gyms);
        console.log(payments);
        let history = [];
        payments.map((p) => {
          gyms.forEach((g) => {
            if (p.gym === g.id) {
              if (p.status === 'available') {
                history.push(g);
                history[history.length - 1].purchase_code = p.generated_code;
              }
            }
          })
        });
        this.Notifications = history;
        this.NotificationsError = false;
        console.log(history);
      })
    }, (error) => {
      console.log(error);
      this.NotificationsError = true;
    })
  }

}
