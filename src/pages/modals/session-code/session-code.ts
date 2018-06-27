import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-session-code',
    templateUrl: 'session-code.html',
})
export class SessionCodePage {

    validationStep: number = 1;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SessionCodePage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    validateCode() {
    //   get code validation and show data
    //    validationStep ++
    }

    acceptCode(){
    //    save code to database
    }
}
