import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ModalController, AlertController} from 'ionic-angular';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {SocialSharing} from "@ionic-native/social-sharing";
import {SharedService} from "../../services/shared.service";
import {GiftService} from "../../services/gift.service";
import {ScanService} from "../../services/scan.service";
import {GymService} from "../../services/gym.service";

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  uid: any;
  free = false;
  gift = true;
  gifts: any[] = [];
  user: any;
  scans: any[] = [];
  myScans: any[] = [];
  groupedScans: any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UsersService,
              public authService: AuthService,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private socialSharing: SocialSharing,
              private alertCtrl: AlertController,
              public sharedService: SharedService,
              private giftService: GiftService,
              private scanService: ScanService,
              private gymService: GymService) {
    this.authService.getStatus().subscribe((result) => {
      this.uid = result.uid;
      this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
        this.user = user;
      });
      this.scanService.getScans().valueChanges().subscribe((data) => {
        this.scans = [];
        data.forEach((s) => {
          const tempArray = Object.keys(s).map(key => s[key]);
          this.scans = this.scans.concat(tempArray);
        });
        this.myScans = this.scans.filter((s) => {return s.uid === this.uid});
        this.groupedScans = this.myScans.reduce(function (r, a) {
          r[a.gym] = r[a.gym] || [];
          r[a.gym].push(a);
          return r;
        }, Object.create(null));
        this.groupedScans = Object.keys(this.groupedScans).map(key => this.groupedScans[key]);
        this.groupedScans = this.groupedScans.filter((s) => {return s.length >= 6});
        this.groupedScans.forEach((gs) => {
          this.gymService.getGym(gs[0].gym).valueChanges().subscribe((data) => {
            gs[0].gym = data;
          }, (error) => {
            console.log(error);
          });
        });
        console.log(this.groupedScans);
      }, (error) => {
        console.log(error);
      });
    });
    this.giftService.getAllGifts().valueChanges().subscribe((data: any) => {
      this.gifts = [];
      data.forEach((g) => {
        g = Object.keys(g).map(key => g[key]);
        g.forEach((gi) => {
          this.gifts.push(gi);
        });
      });
      console.log(this.gifts);
    }, (error) => {
      console.log(error);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
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
  give(v) {
    console.log('gym: ' + v);
    let alert = this.alertCtrl.create({
      title: 'Regalar Visita',
      message: 'Ingresa el email del amigo a quien le deseas regalar una visita para ' + v[0].gym.tradename,
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
              timestamp: Date.now(),
              gym: v[0].gym
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
  shouldBeDisabled(v) {
    v = v[0];
    const search = this.gifts.filter((g) => { return g.from.uid === this.user.uid && g.gym.id === v.gym.id});
    return (search.length > 0);
  }
}
