import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AngularFireDatabase} from "angularfire2/database/database";

declare var OpenPay: any;

@Injectable()
export class ScanService {

    private API_ENDPOINT: string = 'http://liberi-landing.eduardoibarra.com/';

    constructor(private http: Http, private afDB: AngularFireDatabase) {
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
