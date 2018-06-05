import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

declare var OpenPay: any;

@IonicPage()
@Component({
    selector: 'page-add-card',
    templateUrl: 'add-card.html',
})
export class AddCardPage {

    CardData: any = {
        Cardholder: null,
        CardNumber: null,
        CCV: null,
        ExpMonth: null,
        ExpYear: null
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCardPage');
    }

    addCard() {
        // let form = document.getElementById('customer-form');
        // console.log(form);
        //

        let form: any = `
            <form id="customer-form">
                <input type="hidden" name="token_id" id="token_id"/>
   
                <label>Nombre</label>
                <input type="text" size="20" autocomplete="off"  value="${this.CardData.Cardholder}" data-openpay-card="holder_name"/>

                <input type="text" size="20" autocomplete="off"  value="${this.CardData.CardNumber}" data-openpay-card="card_number"/>
                <input type="text" size="4" autocomplete="off"  value="${this.CardData.CCV}" data-openpay-card="cvv2"/>
        
   
                <input type="text" size="2" value="${this.CardData.ExpMonth}" data-openpay-card="expiration_month"/> 
                <input type="text" size="2" value="${this.CardData.ExpYear}" data-openpay-card="expiration_year"/>
           
            </form>
        
        `;

        OpenPay.token.extractFormAndCreate(form, success, error);

        function success(data) {
            console.log(data);
        }

        function error(error) {
            console.log(error);
        }

    }
}
