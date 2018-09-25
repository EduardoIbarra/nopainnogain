import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NotificationService} from "../../services/notification.service";
import {GiftService} from "../../services/gift.service";
import {AuthService} from "../../services/auth.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  isModal: boolean;
  items: any = [
    {
      img: 'https://thumb7.shutterstock.com/display_pic_with_logo/2378354/505996504/stock-vector-fitness-vector-logo-design-template-design-for-gym-and-fitness-vector-505996504.jpg',
      gymName: 'Fitness Club',
      message: '¡Agregó nuevo aparatos!'
    },
    {
      img: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/502633/1500/1000/m1/fpnw/wm0/powerhouse_logo_prev_1-.jpg?1432796447&s=181eb2ac309634997f8ca00cc4495ad8',
      gymName: 'Power House',
      message: '¡Tiene nuevas clases para ti!'
    },
  ];
  generated_code: any;
  currentUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationService: NotificationService,
    public viewCtrl: ViewController,
    private giftService: GiftService,
    private authService: AuthService,
    private sharedService: SharedService,
    private paymentService: PaymentService
  ) {
    this.isModal = this.navParams.get('isModal') || false;
  }

  ionViewWillEnter() {
    this.items = this.notificationService.Notifications;
    this.authService.getStatus().subscribe((data) => {
      this.currentUser = data;
      this.giftService.getGifts(data.email).valueChanges().subscribe((gifts) => {
        gifts.forEach((g) => {
          this.items.push(g);
        });
        console.log(this.items);
        this.items.sort((a, b) => {return b.timestamp - a.timestamp});
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToGym(openGymPurchaseCode) {
    this.navCtrl.push('PurchaseHistoryPage', {openGymPurchaseCode: openGymPurchaseCode})
  }

  generateCode(v) {
    if (!confirm('Deseas reclamar tu visita gratis ahora?')) {
      return;
    }
    let payment: any = {
      amount: '0',
      generated_code: this.sharedService.generateCode(),
      gym: v.gym.id,
      status: 'available',
      timestamp: Math.round((new Date()).getTime()),
      from: v.from.uid
    };
    this.generated_code = payment.generated_code;
    this.paymentService.createPayment(this.currentUser.uid, payment.generated_code, payment).then((response) => {
      alert('Se ha generado exitosamente el código ' + this.generated_code + ', lo puedes encontrar en la sección de HISTORIAL DE COMPRAS');
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }
}
