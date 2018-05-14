import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  UserData:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  resetPassword() {
    this.authService.resetPassword(this.UserData.username).then((result)=>{
      alert('Un email ha sido enviado a tu dirección de correo para reestablecer tu contraseña.');
      console.log(result);
      this.navCtrl.popToRoot();
    }).catch((error)=>{
      alert('Ha ocurrido un error: "'+error.message+'"');
      console.log(error);
    })
  }

}
