import {Injectable} from '@angular/core';
import {AlertController} from "ionic-angular";

@Injectable()

export class AlertService {

  constructor(private alertCtrl: AlertController) {
  }


  incorrectEmailLoginCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Información incorrecta',
      message: 'El correo electrónico es incorrecto, intenta de nuevo.',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  incorrectPasswordLoginCredentials() {
    let alert = this.alertCtrl.create({
      title: 'Información incorrecta',
      message: 'La contraseña es incorrecta, intenta de nuevo.',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  facebookLoginError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'No hemos podido iniciar con Facebook, intenta de nuevo más tarde.',
      buttons: ['OK']
    });
    alert.present();
  }

  serverError() {
    let alert = this.alertCtrl.create({
      title: 'Error en conexión al servidor',
      message: 'Ha ocurrido un error, por favor intentelo más tarde.',
      buttons: ['OK']
    });
    alert.present();
  }

  userLocationError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'No hemos podido obtener tu ubicación.',
      buttons: ['OK']
    });
    alert.present();
  }

  gymListError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'No hemos podido obtener los gimnasios cecanos, intenta de nuevo.',
      buttons: ['OK']
    });
    alert.present();
  }

  signupError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'No hemos podido registrar tu informacion, intenta de nuevo más tarde.',
      buttons: ['OK']
    });
    alert.present();
  }

  createAlertError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'No hemos podido registrar esta tarjeta, intenta de nuevo más tarde.',
      buttons: ['OK']
    });
    alert.present();
  }

  validateCodeError() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'El código ingresado no es válido o ya había sido usado anteriormente.',
      buttons: ['OK']
    });
    alert.present();
  }

  acceptCode(code) {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      message: 'Ocurrió un error al tratar de usar tu código' + code,
      buttons: ['OK']
    });
    alert.present();
  }


}
