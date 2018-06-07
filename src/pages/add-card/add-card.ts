import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../validators/password.validator";
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";
import {AlertService} from "../../services/alert.service";
import {Storage} from "@ionic/storage";

declare var OpenPay: any;

@IonicPage()
@Component({
    selector: 'page-add-card',
    templateUrl: 'add-card.html',
})
export class AddCardPage {

    CardForm: FormGroup;

    CardData: any = {
        Cardholder: 'Fulanito de Tal',
        CardNumber: '4111111111111111',
        CCV: '123',
        ExpMonth: 12,
        ExpYear: 21
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public loadingService: LoadingService,
                public storage: Storage,
                public alertService: AlertService,
                public sharedService: SharedService,) {

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
                this.loadingService.dismiss();

                if (!this.sharedService.UserData.Cards) {
                    this.sharedService.UserData.Cards = [];
                }
                this.sharedService.UserData.Cards.push(data.data);
                this.storage.set('UserData', this.sharedService.UserData);
                this.navCtrl.pop();

            }, (error) => {
                console.log(error);
                this.loadingService.dismiss()
                this.alertService.createAlertError();
            });

    }
}
