import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../validators/password.validator";
import {LoadingService} from "../../services/loading.service";

declare var OpenPay: any;

@IonicPage()
@Component({
    selector: 'page-add-card',
    templateUrl: 'add-card.html',
})
export class AddCardPage {

    CardForm: FormGroup;

    CardData: any = {
        Cardholder: null,
        CardNumber: null,
        CCV: null,
        ExpMonth: null,
        ExpYear: null
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public loadingService: LoadingService) {

        //Form validations
        this.CardForm = formBuilder.group({
            Cardholder: ['', Validators.compose([
                Validators.required
            ])],
            CardNumber: ['', Validators.compose([
                Validators.required,
                Validators.minLength(16),
                Validators.maxLength(16),
                Validators.pattern('^[0-9]*$'),
            ])],
            CCV: ['', Validators.compose([
                Validators.required,
            ])],
            ExpMonth: ['', Validators.compose([
                Validators.required
            ])],
            ExpYear: ['', Validators.compose([
                Validators.required
            ])],
        });


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCardPage');
    }

    addCard() {
        this.loadingService.presentLoading();
        OpenPay.token.create({
                "card_number": this.CardData.CardNumber,
                "holder_name": this.CardData.Cardholder,
                "expiration_year": this.CardData.ExpYear,
                "expiration_month": this.CardData.ExpMonth,
                "cvv2": this.CardData.CCV
            },
            (data) => {
                console.log(data);
                this.loadingService.dismiss()
            }, (error) => {
                console.log(error);
                this.loadingService.dismiss()
            });

    }
}
