import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  uid: any;

  free = false;
  gift = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UsersService,
    public authService: AuthService,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    this.authService.getStatus().subscribe((result) => {
      this.uid = result.uid;
      this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
        
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

}
