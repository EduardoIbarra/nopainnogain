import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

import {Observable} from 'rxjs/Observable';
import {Facebook} from "@ionic-native/facebook";
import {UsersService} from "./users.service";
import {SharedService} from "./shared.service";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private facebook: Facebook, public usersService: UsersService, public sharedService: SharedService) {
    this.user = firebaseAuth.authState;
  }

  facebookLogin() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  facebookLoginWithCredentials(navCtrl) {
    this.facebook.login(['email', 'public_profile']).then((data) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then((fbData) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.authResponse.accessToken);
        this.firebaseAuth.auth.signInWithCredential(credential).then((data2) => {
          let user = {
            uid: data2.uid,
            name: fbData.first_name,
            last_name: fbData.last_name,
            email: fbData.email,
            profile_picture: fbData.picture_large.data.url,
            fb_token: data.authResponse.accessToken
          };
          this.usersService.createUser(user, user.uid);
          this.sharedService.login(user, navCtrl);
        }).catch((error) => {
          console.log(error);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  resetPassword(email) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  getStatus() {
    return this.firebaseAuth.authState;
  }

}
