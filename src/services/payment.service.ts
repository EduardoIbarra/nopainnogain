import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AngularFireDatabase} from "angularfire2/database/database";

declare var OpenPay: any;

@Injectable()
export class PaymentService {

    private API_ENDPOINT: string = 'http://liberi-landing.eduardoibarra.com/';

    constructor(private http: Http, private afDB: AngularFireDatabase) {
    }

    GymPayment(cardData, userData, amount) {
        let body: any = {
            name: userData.name,
            last_name: userData.last_name,
            phone_number: '',
            email: userData.email,
            token_id: cardData.id,
            amount: amount,
            description: cardData.card.card_number,
            use_card_points: false,
            deviceIdHiddenFieldName: OpenPay.deviceData.setup()
        };
        return this.http.post(this.API_ENDPOINT + 'processCharge/', body).map(data => data.json());
    }

    getPayments(){
        return this.afDB.object('/payments/');
    }
    getPayment(uid, code) {
      return this.afDB.object('/payments/' + uid + '/' + code);
    }
    setPaymentProperty(uid, code, property, value) {
      return this.afDB.object('/payments/' + uid + '/' + code + '/' + property).set(value);
    }
}
