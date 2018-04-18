import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GymService} from "../../services/gym.service";


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    UserData: any = {
        username: null,
        password: null
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
    ) {
    }

    login() {
        console.log(this.UserData);
    }

}
