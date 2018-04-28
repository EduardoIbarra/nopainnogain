import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

import {Observable} from 'rxjs/Observable';
import {Facebook} from "@ionic-native/facebook";

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(private firebaseAuth: AngularFireAuth, private facebook: Facebook) {
        this.user = firebaseAuth.authState;
    }

    facebookLogin() {
        // return this.facebook.login(['email', 'public_profile']);
        //
        //
        // let provider: any = new firebase.auth.FacebookAuthProvider();
        // return this.firebaseAuth.auth.signInWithRedirect(provider).then(() => {
        //     return this.firebaseAuth.auth.getRedirectResult();
        // })
        //

        return this.firebaseAuth.auth.signInWithPopup(provider);
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

}
