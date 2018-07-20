import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  isModal: boolean;
  items: any = [
    {
      img: 'https://thumb7.shutterstock.com/display_pic_with_logo/2378354/505996504/stock-vector-fitness-vector-logo-design-template-design-for-gym-and-fitness-vector-505996504.jpg',
      gymName: 'Fitness Club',
      message: '¡Agregó nuevo aparatos!'
    },
    {
      img: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/502633/1500/1000/m1/fpnw/wm0/powerhouse_logo_prev_1-.jpg?1432796447&s=181eb2ac309634997f8ca00cc4495ad8',
      gymName: 'Power House',
      message: '¡Tiene nuevas clases para ti!'
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.isModal = this.navParams.get('isModal') || false;
  }

}
