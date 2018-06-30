import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {
  settings = {
    aerobico: false,
    crossfit: false,
    ritmos: false,
    pole: false,
    jumping: false,
    spinning: false,
    mma: false,
    karate: false,
    funcional: false,
    pesas: false,
    zumba: false,
    danza: false,
    yoga: false,
    barre: false,
    boxeo: false,
    taekwondo: false,
    natacion: false,
    otras: false,
    location: 0,
    price: 0
  };
  uid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UsersService, public authService: AuthService, private toastCtrl: ToastController) {
    this.authService.getStatus().subscribe((result) => {
      this.uid = result.uid;
      this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
        this.settings = user.settings || this.settings;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

  savePreferences() {
    this.userService.setUserAttribute(this.uid, 'settings', this.settings)
      .then((result) => {
        this.presentToast('Preferencias guardadas exitosamentme');
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

}
