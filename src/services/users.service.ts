import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {objectAssign} from "@ionic/app-scripts";

@Injectable()
export class UsersService {
    constructor(public afDB: AngularFireDatabase) {
    }

    public getUsers() {
        return this.afDB.list('/users/');
    }

    public getUser(id) {
        return this.afDB.object('/users/' + id);
    }

    public createUser(user) {
        let body  =  Object.assign({}, user);
        body.birthday = user.birthday.value;
        body.id = Date.now();
        body.from_app = true;
        return this.afDB.database.ref('/users/' + user.id).set(user);
    }

    public createParentUser(user) {
        return this.afDB.database.ref('/users/' + user.id).set(user);
    }

    public editUser(user) {
        return this.afDB.database.ref('/users/' + user.id).set(user);
    }

    public deleteUser(user) {
        return this.afDB.database.ref('/users/' + user.id).remove();
    }
}
