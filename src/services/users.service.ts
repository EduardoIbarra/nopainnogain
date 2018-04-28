import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {objectAssign} from "@ionic/app-scripts";

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

    public createUser(data, uid) {
        let user: any  =  Object.assign({}, data);
        user.from_app = true;
        return this.afDB.database.ref('/users/' + uid).set(user);
    }

    public createParentUser(user) {
        return this.afDB.database.ref('/users/' + user.uid).set(user);
    }

    public editUser(user) {
        return this.afDB.database.ref('/users/' + user.uid).set(user);
    }

    public deleteUser(user) {
        return this.afDB.database.ref('/users/' + user.uid).remove();
    }
}
