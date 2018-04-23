import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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
            this.sharedService.setPageRoot('HomePage', true);
        }, 3000)
    }

}
