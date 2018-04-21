import {Injectable} from '@angular/core';
import {AlertController, NavController} from "ionic-angular";

@Injectable()

export class AlertService {

    constructor(private alertCtrl: AlertController) {
    }


    incorrectLoginCredentials() {
        let alert = this.alertCtrl.create({
            title: 'Información incorrecta',
            message: 'Correo electrónico y/o contraseña incorrecto. Intenta de nuevo.',
            buttons: ['Cerrar']
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

}