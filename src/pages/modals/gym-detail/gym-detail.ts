import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ViewController, ModalController} from 'ionic-angular';
import {SharedService} from "../../../services/shared.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-gym-detail',
  templateUrl: 'gym-detail.html',
})
export class GymDetailPage {

  segment: string;
  gym: any;
  reviews: any;
  average = 0;
  isOpenToday: boolean = false;
  youtubeLink: SafeResourceUrl;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public sharedService: SharedService,
              public sanitizer: DomSanitizer,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private launchNavigator: LaunchNavigator) {

    this.gym = navParams.get('data');
    if (this.gym.reviews) {
      this.gym.reviews = Object.keys(this.gym.reviews).map(key => this.gym.reviews[key]);
      this.gym.reviews.reverse();
    }
    // this.gym.CostoIva = parseFloat(this.gym.CostoIva) / 30;
    console.log(this.gym);
  }

  ionViewDidLoad() {
    console.log(this.gym);
    this.segment = 'info';
    this.isOpenToday = this.sharedService.getGymOpenDays(this.gym);
    this.getYoutubeLink();
  }

  getYoutubeLink() {
    let url = 'https://www.youtube.com/embed/-VdZRGsKZn4';
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(this.youtubeLink);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  activeSegment(segment) {
    this.segment = segment;
  }

  purchase() {
    let modal = this.modalCtrl.create('GymPurchasePage', {viewCtrl: this.viewCtrl, gym: this.gym, isModal: true});
    modal.present();
    // this.navCtrl.push('GymPurchasePage', {viewCtrl: this.viewCtrl, gym: this.gym});
  }

  goToGym(gym) {
    let options: LaunchNavigatorOptions = {
      start: ''
    };

    this.launchNavigator.navigate(gym.lat+','+gym.lng, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
  getStarNameReview(starN, i) {
    return (starN <= i) ? 'star' : 'star-outline';
  }
}
