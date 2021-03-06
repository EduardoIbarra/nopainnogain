import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    user: any;

    constructor(public sharedService: SharedService, public navParams: NavParams) {
        this.user = this.navParams.get('UserData');
    }

    ionViewDidLoad() {
        setTimeout(() => {
          console.log(this.user);
          if (this.user && this.user.gym_owner) {
            this.sharedService.setPageRoot('ValidateSessionPage', true);
          } else {
            this.sharedService.setPageRoot('HomePage', true);
          }
        }, 3000)
    }

}
