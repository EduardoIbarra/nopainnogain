import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GymService} from "../../services/gym.service";
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {UsersService} from "../../services/users.service";
import {SharedService} from "../../services/shared.service";
import {AlertService} from "../../services/alert.service";


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
                public sharedService: SharedService,
                public alertService: AlertService,
                public userService: UsersService,
                public loadingService: LoadingService,
                public authService: AuthService,) {
    }

    login() {
        this.loadingService.presentLoading();
        console.log(this.UserData);
        this.authService.login(this.UserData.username, this.UserData.password).then(response => {
            console.log(response);
            this.getUserData(response.uid);
        }).catch((error) => {
            console.log(error);
            console.log('Something went wrong:', error.message);
            if(error.code === 'auth/user-not-found') this.alertService.incorrectEmailLoginCredentials();
            if(error.code === 'auth/wrong-password') this.alertService.incorrectPasswordLoginCredentials();
            this.loadingService.dismiss();
        });
    }

    getUserData(uid) {
        this.userService.getUser(uid).then(response => {
            console.log(response.val());
            this.loadingService.dismiss();
            this.sharedService.login(response.val(), this.navCtrl);
        }).catch((error) => {
            console.log(error);
            console.log('Something went wrong:', error.message);
            this.loadingService.dismiss();
        });
    }


}
