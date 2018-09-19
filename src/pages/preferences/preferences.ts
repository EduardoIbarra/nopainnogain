import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController, Events} from 'ionic-angular';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  isModal: boolean;

  /*settings = {
      pesas: false,
      aerobico: false,
      crossfit: false,
      zumba: false,
      ritmos: false,
      danza: false,
      pole: false,
      yoga: false,
      barre: false,
      jumping: false,
      spinning: false,
      boxeo: false,
      mma: false,
      taekwondo: false,
      karate: false,
      natacion: false,
      sauna: false,
      funcional: false,
      trx: false,
      otras: false,
      location: 0,
      price: 0
  };*/
  preferences = [
      {
          id: 1, value: false
      },
      {
          id: 2, value: false
      },
      {
          id: 3, value: false
      },
      {
          id: 4, value: false
      },
      {
          id: 5, value: false
      },
      {
          id: 6, value: false
      },
      {
          id: 7, value: false
      },
      {
          id: 8, value: false
      },
      {
          id: 9, value: false
      },
      {
          id: 10, value: false
      },
      {
          id: 11, value: false
      },
      {
          id: 12, value: false
      },
      {
          id: 13, value: false
      },
      {
          id: 14, value: false
      },
      {
          id: 15, value: false
      },
      {
          id: 16, value: false
      },
      {
          id: 17, value: false
      },
      {
          id: 18, value: false
      },
      {
          id: 19, value: false
      },
      {
          id: 20, value: false
      }
  ];
    settings = {
        preferences: this.preferences,
        location: 0,
        price: 0
    };
  uid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UsersService,
    public authService: AuthService,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    public events: Events) {
    this.authService.getStatus().subscribe((result) => {
      this.uid = result.uid;
      this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
        this.settings = user.settings || this.settings;
        this.preferences = user.settings.preferences || this.preferences;
      });
    });

    this.isModal = this.navParams.get('isModal') || false;
  }

  savePreferences() {
    this.userService.setUserAttribute(this.uid, 'settings', this.settings)
      .then((result) => {
        if(this.isModal){
          this.viewCtrl.dismiss();
        }else{
          this.navCtrl.setRoot('HomePage')
        }
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
