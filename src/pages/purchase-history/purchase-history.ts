import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  @ViewChild(Content) content: Content;
  currentUser: any;
  history: any = [];
  items: any = [];
  myRate: number = 5;
  openGymPurchaseCode: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentService: PaymentService,
    public gymService: GymService,
    public sharedService: SharedService,
    public loadingService: LoadingService,
    public authService: AuthService,
    public toastController: ToastController
  ) {
    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
    });
  }

  ionViewDidLoad() {
    this.openGymPurchaseCode = this.navParams.get('openGymPurchaseCode') || null;
    this.getPayments();
  }

  getPayments() {
    this.loadingService.presentLoading();
    this.paymentService.getPaymentsByUser(this.currentUser.uid).valueChanges().subscribe((payments: any) => {
      console.log(payments);
      if (!payments) {
        this.loadingService.dismiss();
        return;
      }
      payments = Object.keys(payments).map(key => payments[key]);
      this.gymService.getGyms().valueChanges().subscribe((gyms: any) => {
        console.log(gyms);
        this.history = [];
        payments.map((p) => {
          gyms.forEach((g) => {
            if (p.gym === g.id) {
              if (g.reviews) {
                g.reviews = Object.keys(g.reviews).map(key => g.reviews[key]);
              }
              this.history.push(g);
              this.history[this.history.length - 1].purchase_code = p.generated_code;
              this.history[this.history.length - 1].status = p.status;
              this.history[this.history.length - 1].purchase_price = p.amount;
              this.history[this.history.length - 1].purchase_date = p.timestamp;
              this.history[this.history.length - 1].isOpen = false;
              this.history[this.history.length - 1].openToday = this.sharedService.getGymOpenDays(g);
              this.history[this.history.length - 1].imageLoaded = false;
              // this.getCodeImage(this.history.length - 1);
            }
          })
        });

        this.loadingService.dismiss();

        if (this.openGymPurchaseCode) {
          this.history.map((h) => {
            if (h.purchase_code === this.openGymPurchaseCode) {
              h.isOpen = true;
              this.sharedService.scrollTo('gymPurchaseCode_' + this.openGymPurchaseCode, this.content)
            }
          });

        }
        console.log(this.history);
      })
    }, (error) => {
      this.loadingService.dismiss();
      console.log(error);
    })
  }

  getCodeImage(i) {
    this.paymentService.generateQrCode(this.history[i].purchase_code).subscribe((res: any) => {
      console.log(res);
      this.history[i].QRCodeImage = res._body;
    });
  }

  getStarName(starN, i) {
    return (starN <= i.myRate) ? 'star' : 'star-outline';
  }

  getStarNameReview(starN, i) {
    return (starN <= i) ? 'star' : 'star-outline';
  }

  setReview(i) {
    // this.loadingService.presentLoading();
    const review = {
      uid: this.currentUser.uid,
      gym_id: i.id,
      rating: i.myRate,
      message: i.myMessage,
      timestamp: Date.now()
    };
    console.log(review);
    this.gymService.setReview(review).then((data) => {
      const toast = this.toastController.create({
        message: '¡Muchas gracias por tu reseña!',
        duration: 3000
      });
      toast.present();
      i.reviewDone = true;
      // this.loadingService.dismiss();
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
      // this.loadingService.dismiss();
    });
  }
}
