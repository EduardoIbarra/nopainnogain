import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ScanService {

    constructor(private afDB: AngularFireDatabase) {
    }
    getScans(){
        return this.afDB.object('/scans/');
    }
    getScan(uid, code) {
      return this.afDB.object('/scans/' + uid + '/' + code);
    }
    createScan(scan) {
      return this.afDB.object('/scans/' + scan.gym + '/' + scan.timestamp).set(scan);
    }
}
