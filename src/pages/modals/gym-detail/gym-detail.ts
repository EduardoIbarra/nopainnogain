import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ViewController} from 'ionic-angular';
import {SharedService} from "../../../services/shared.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@IonicPage()
@Component({
    selector: 'page-gym-detail',
    templateUrl: 'gym-detail.html',
})
export class GymDetailPage {

    segment: string;
    gym: any;
    isOpenToday: boolean = false;
    youtubeLink: SafeResourceUrl;

    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public sharedService: SharedService,
                public sanitizer: DomSanitizer,
                public navParams: NavParams) {

        this.gym = navParams.get('data');
    }

    ionViewDidLoad() {
        console.log(this.gym);
        this.segment = 'img';
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
        this.navCtrl.push('GymPurchasePage', {viewCtrl: this.viewCtrl, gym: this.gym});
    }
}
