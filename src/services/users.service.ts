import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class UsersService {
    constructor(private afDB: AngularFireDatabase) {
    }

    public getUsers() {
        return this.afDB.list('/users/');
    }

    public getUser(uid) {
        return this.afDB.database.ref('/users/' + uid).once('value');
    }

    public getUserById(uid) {
      return this.afDB.object('/users/' + uid);
    }

    public createUser(data, uid) {
        let user: any  =  Object.assign({}, data);
        user.from_app = true;
        return this.afDB.database.ref('/users/' + uid).set(user);
    }

    public createParentUser(user) {
        return this.afDB.database.ref('/users/' + user.uid).set(user);
    }

    public editUser(user) {
        /*this.afDB.object('/users/' + user.uid).update({
            'birthday': user.birthday,
            'card_cvv': user.card_cvv,
            'card_expiration': user.card_expiration,
            'card_holder': user.card_holder,
            'card_number': user.card_number,
            'city': user.city,
            'confirmPassword': user.confirmPassword,
            'email': user.email,
            'from_app': user.from_app,
            'gender': user.gender,
            'last_name': user.last_name,
            'name': user.name,
            'phone': user.phone,
            'postal_code': user.postal_code,
            'state':  user.state
        });*/
        return this.afDB.database.ref('/users/' + user.uid).set(user);
    }

    public deleteUser(user) {
        return this.afDB.database.ref('/users/' + user.uid).remove();
    }

    public setUserAttribute(uid, attribute, value) {
      return this.afDB.database.ref('/users/' + uid + '/' + attribute).set(value);
    }
}
