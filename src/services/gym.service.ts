import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class GymService {
    constructor(public afDB: AngularFireDatabase) {
    }

    public getGyms() {
        return this.afDB.list('/gyms/');
    }

    public getGym(id) {
        return this.afDB.object('/gyms/' + id);
    }

    public createGym(gym) {
        return this.afDB.database.ref('/gyms/' + gym.id).set(gym);
    }

    public createParentGym(gym) {
        return this.afDB.database.ref('/gyms/' + gym.id).set(gym);
    }

    public editGym(gym) {
        return this.afDB.database.ref('/gyms/' + gym.id).set(gym);
    }

    public deleteGym(gym) {
        return this.afDB.database.ref('/gyms/' + gym.id).remove();
    }

    public setReview(review) {
      return this.afDB.database.ref('/gyms/' + review.gym_id + '/reviews/' + review.uid).set(review);
    }
}
