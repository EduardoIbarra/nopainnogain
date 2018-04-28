import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GymService} from "../../services/gym.service";
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {UsersService} from "../../services/users.service";
import {SharedService} from "../../services/shared.service";
import {AlertService} from "../../services/alert.service";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    UserData: any = {
        username: null,
        password: null,
        name: null,
        last_name: null,
        email: null,
        profile_picture: null,
        fb_id: null,
        fb_token: null,
        uid: null,
        birthday: {
            value: null,
            text: null
        },
        from_app: true,
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public sharedService: SharedService,
                public facebook: Facebook,
                public alertService: AlertService,
                public usersService: UsersService,
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
            if (error.code === 'auth/user-not-found') this.alertService.incorrectEmailLoginCredentials();
            if (error.code === 'auth/wrong-password') this.alertService.incorrectPasswordLoginCredentials();
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


    facebookLogin() {
        this.loadingService.presentLoading();
        this.authService.facebookLogin().then((response) => {
            console.log(response);
            let user = {
              uid: response.user.uid,
              name: response.additionalUserInfo.profile.first_name,
              last_name: response.additionalUserInfo.profile.last_name,
              email: response.additionalUserInfo.profile.email,
              profile_picture: response.additionalUserInfo.profile.picture.data.url,
              fb_token: response.credential.accessToken
            };
            this.usersService.createUser(user, user.uid);
            this.loadingService.dismiss();
            this.sharedService.login(user, this.navCtrl);
        }, (error) => {
            console.log(error);
            this.UserData.password = null;
            this.loadingService.dismiss();
            this.alertService.facebookLoginError();
        })
    }


    signup() {
        this.loadingService.presentLoading();
        this.authService.signup(this.UserData.email, this.UserData.password).then((response) => {
            console.log(response);
            this.createUser(response.uid);
        }, (error) => {
            console.log(error);
            this.loadingService.dismiss();
            this.alertService.signupError();
            this.UserData.password = null;
        })
    }

    createUser(uid) {
        this.usersService.createUser(this.UserData, uid).then((response) => {
            console.log(response);
            this.getUserData(uid)
        }, (error) => {
            console.log(error);
            this.loadingService.dismiss();
            this.alertService.signupError();
        })
    }
}
