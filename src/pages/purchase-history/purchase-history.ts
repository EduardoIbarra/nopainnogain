import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-purchase-history',
    templateUrl: 'purchase-history.html',
})
export class PurchaseHistoryPage {

    items: any = [
        {isOpen: false, avatar: 'assets/img/example/bonga.jpg', name: 'Bonga GYM', price: '78.00', date: 'Martes 17 de Agosto. 07:32 Hrs'},
        {isOpen: false, avatar: 'assets/img/example/snap.jpg', name: 'Snap Fitness', price: '55.00', date: 'Viernes 19 de Mayo. 15:03 Hrs'},
        {isOpen: false, avatar: 'assets/img/example/olympia.jpg', name: 'Olympia GYM', price: '65.00', date: 'Lunes 17 de Abril. 06:55 Hrs'},
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    toggleGymView(gym) {
        gym.isOpen = !gym.isOpen
    }

}
