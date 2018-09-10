import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ModalController, AlertController} from 'ionic-angular';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {SocialSharing} from "@ionic-native/social-sharing";
import {SharedService} from "../../services/shared.service";
import {GiftService} from "../../services/gift.service";

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  uid: any;
  free = false;
  gift = true;
  user: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UsersService,
    public authService: AuthService,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
              private alertCtrl: AlertController,
              public sharedService: SharedService,
              private giftService: GiftService) {
    this.authService.getStatus().subscribe((result) => {
      this.uid = result.uid;
      this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
        this.user = user;
      });
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showHowTo(type: string) {
    let modal = this.modalCtrl.create('HowToPromotionsPage', { type: type });
    modal.present();
  }

  invite() {
    try {
      this.socialSharing.share('¡Te invito a usar Líberi, la mejor forma de estar en forma!', 'Conoce Líberi', '', 'https://google.com');
    } catch (e) {
      alert('Ocurrió un error: ' +  JSON.stringify(e));
    }
  }

  giveVisit() {
    let alert = this.alertCtrl.create({
      title: 'Regalar Visita',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email de tu amigo'
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
          text: 'Enviar',
          handler: data => {
            const gift = {
              from: this.user,
              to: data.email,
              timestamp: Date.now()
            };
            this.giftService.createGift(gift).then((data) => {
              this.alertCtrl.create({title: '¡Gracias!', message: 'Le avisaremos a tu amigo acerca de tu regalo', buttons: [{text: 'Ok', role: 'cancel'}]}).present();
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
