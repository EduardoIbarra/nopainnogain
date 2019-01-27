import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthService} from '../../../services/auth.service';

@IonicPage()
@Component({
    selector: 'page-privacy',
    templateUrl: 'privacy.html',
})
export class PrivacyPage {
    type: string;
  isModal: boolean;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public authService: AuthService,
    ) {
      this.isModal = this.navParams.get('isModal') || false;
    }

    ionViewDidLoad() {
        this.type = this.navParams.get('type') || null;
        console.log(this.type);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
