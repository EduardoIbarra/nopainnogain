import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GymService} from "../../services/gym.service";
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";


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
                public loadingService: LoadingService,
                public authService: AuthService,) {
    }

    login() {
        this.loadingService.presentLoading();
        console.log(this.UserData);
        this.authService.login(this.UserData.username, this.UserData.password).then(value => {
            console.log(value);
            console.log('Nice, it worked!');
            this.loadingService.dismiss();
        }).catch((error) => {
            console.log(error);
            console.log('Something went wrong:', error.message);
            this.loadingService.dismiss();
        });
    }

}
