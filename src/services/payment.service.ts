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
            phone_number: '',
            email: userData.email,
            token_id: cardData.id,
            amount: amount,
            description: cardData.data.card_number,
            use_card_points: false,
            deviceIdHiddenFieldName: OpenPay.deviceData.setup()
        };
        return this.http.post(this.API_ENDPOINT + 'processCharge/', body).map((data) => {
            return data.json()
        });
    }

}
