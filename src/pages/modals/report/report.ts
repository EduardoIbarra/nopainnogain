import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AuthService} from '../../../services/auth.service';
import {HelpService} from "../../../services/help.service";
import {SharedService} from "../../../services/shared.service";

@IonicPage()
@Component({
    selector: 'page-report',
    templateUrl: 'report.html',
})
export class ReportPage {
    type: string;
    form: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public authService: AuthService,
        private helpService: HelpService,
        private sharedService: SharedService,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {
    }

    ionViewDidLoad() {
        this.type = this.navParams.get('type') || null;
        console.log(this.type);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    send() {
      const loader = this.loadingCtrl.create({
        content: "Enviando..."
      });
      loader.present();
      const user = this.sharedService.getUserData();
      const report = {
        user: user.uid,
        uid: Date.now(),
        subject: this.form.subject,
        message: this.form.message,
        type: this.navParams.get('type')
      };
      this.helpService.sendReport(report).then((data) => {
        console.log(data);
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: '¡Su reporte fue enviado correctamente!',
          duration: 3500
        });
        toast.present().then((data) => {
          this.dismiss();
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
        loader.dismiss();
      });
    }
}
