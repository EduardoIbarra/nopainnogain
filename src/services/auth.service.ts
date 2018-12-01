import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

import {Observable} from 'rxjs/Observable';
import {Facebook} from "@ionic-native/facebook";
import {UsersService} from "./users.service";
import {SharedService} from "./shared.service";
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private facebook: Facebook, public usersService: UsersService, public sharedService: SharedService, private afDB: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
  }

  facebookLogin() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  facebookLoginWithCredentials(navCtrl) {
    this.facebook.login(['email', 'public_profile']).then((data) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then((fbData) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.authResponse.accessToken);
        console.log(fbData);
        this.firebaseAuth.auth.signInWithCredential(credential).then((data2) => {
          let user = {
            uid: data2.uid,
            name: fbData.first_name,
            last_name: fbData.last_name,
            email: fbData.email,
            profile_picture: fbData.picture_large.data.url,
            fb_token: data.authResponse.accessToken
          };
          //let result : any = this.afDB.object('/users/' + user.uid);
            let result : any = null;

            this.afDB.object('/users/' + user.uid).valueChanges().subscribe((res: any) => {
              //console.log('res');
              //console.log(res);
              result = res;
              if(!result){
                  console.log('user not found');
                  this.usersService.createUser(user, user.uid);
              }else{
                  console.log('user found');
                  //console.log(result);
                  user['birthday'] = result.birthday;
                  user['city'] = result.city;
                  user['gender'] = result.gender;
                  user['phone'] = result.phone;
                  user['postal_code'] = result.postal_code;
                  user['state'] = result.state;
                  console.log(user);
              }
              this.sharedService.login(user, navCtrl);
            });
        }).catch((error) => {
          const message = (error && error.code == 'auth/account-exists-with-different-credential') ? 'El correo asociado a tu cuenta de Facebook ya se encuentra registrado, favor de acceder vía email o intenta con otra cuenta.' : error.message;
          alert('Ocurrió un error al tratar de ingresar con Facebook: ' + message);
          console.log(error);
        });
      });
    }).catch((error) => {
      const message = (error && error.code == 'auth/account-exists-with-different-credential') ? 'El correo asociado a tu cuenta de Facebook ya se encuentra registrado, favor de acceder vía email o intenta con otra cuenta.' : error.message;
      alert('Ocurrió un error al tratar de ingresar con Facebook: ' + message);
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

  sendVerificationEmail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification();
  }

  reloadUser() {
    return this.firebaseAuth.auth.currentUser.reload();
  }
}
