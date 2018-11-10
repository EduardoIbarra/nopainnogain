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
          description: 'Gym Payment',
          holder_name: cardData.card.holder_name,
          card_number: cardData.card.card_number_plain,
          expiration_month: cardData.card.expiration_month,
          expiration_year: cardData.card.expiration_year,
          card_cvv: cardData.card.card_cvv,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          postal_code: userData.postal_code,
          use_card_points: false,
          deviceIdHiddenFieldName: OpenPay.deviceData.setup()
    };
      console.log(body);
    return this.http.post(this.API_ENDPOINT + 'processCharge/', body).map(data => data.json());
  }

  getPayments() {
    return this.afDB.object('/payments/');
  }

  getPaymentsByUser(uid) {
    return this.afDB.object('/payments/' + uid);
  }

  getPayment(uid, code) {
    return this.afDB.object('/payments/' + uid + '/' + code);
  }

  setPaymentProperty(uid, code, property, value) {
    return this.afDB.object('/payments/' + uid + '/' + code + '/' + property).set(value);
  }

  generateQrCode(code) {
    return this.http.get('https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=' + code);
  }

  createPayment(uid, code, payment) {
    return this.afDB.object('/payments/' + uid + '/' + code).set(payment);
  }
}
