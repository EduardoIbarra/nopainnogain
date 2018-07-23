import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthService} from '../../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-how-to-promotions',
  templateUrl: 'how-to-promotions.html',
})
export class HowToPromotionsPage {
  type: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthService,
  ) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type') || null;
    console.log(this.type);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
