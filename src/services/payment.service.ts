import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

declare var OpenPay: any;

@Injectable()
export class PaymentService {

    private API_ENDPOINT: string = 'http://liberi-landing.eduardoibarra.com/';

    constructor(private http: Http) {
    }

    GymPayment(cardData, userData, amount) {
        let body: any = {
            name: userData.name,
            last_name: userData.last_name,
            phone_number: '8341687731',
            email: userData.email,
            token_id: cardData.token_id,
            amount: amount,
            description: 'Gym Payment',
            use_card_points: false,
            deviceIdHiddenFieldName: cardData.deviceSessionId
        };
        return this.http.post(this.API_ENDPOINT + 'processCharge/', body).map(data => data.json());
    }

}
