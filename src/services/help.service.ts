import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class HelpService {
    constructor(public afDB: AngularFireDatabase) {
    }

    public getTutorials() {
        return this.afDB.list('/tutorials/');
    }
    public sendReport(report) {
      return this.afDB.object('/reports/' + report.uid).set(report);
    }
}
