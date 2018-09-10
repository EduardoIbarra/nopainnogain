import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class GiftService {
  constructor(public afDB: AngularFireDatabase) {
  }

  public getGifts(email) {
    email = this.replaceAll(email, '.', ',');
    return this.afDB.list('/gifts/' + email);
  }

  public getGift(id) {
    return this.afDB.object('/gifts/' + id);
  }

  public createGift(gift) {
    gift.to = this.replaceAll(gift.to, '.', ',');
    return this.afDB.database.ref('/gifts/' + gift.to + '/' + gift.from.uid).set(gift);
  }

  public createParentGift(gift) {
    return this.afDB.database.ref('/gifts/' + gift.id).set(gift);
  }

  public editGift(gift) {
    return this.afDB.database.ref('/gifts/' + gift.id).set(gift);
  }

  public deleteGift(gift) {
    return this.afDB.database.ref('/gifts/' + gift.id).remove();
  }

  public setReview(review) {
    return this.afDB.database.ref('/gifts/' + review.gift_id + '/reviews/' + review.uid).set(review);
  }
  private replaceAll(str, find, replace) {
    return str.split(find).join(replace);
  }
}
