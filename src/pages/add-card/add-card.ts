import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {SharedService} from "../../services/shared.service";
import {AlertService} from "../../services/alert.service";
import {Storage} from "@ionic/storage";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {UsersService} from "../../services/users.service";
import {ImageViewerController} from "ionic-img-viewer";
declare var OpenPay: any;

@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {

  CardForm: FormGroup;
  isEditable: boolean;
  cardIndex: number;
  CardData: any = {
    Cardholder: null,
    CardNumber: null,
    CCV: null,
    ExpMonth: null,
    ExpYear: null,
    Cardaddress: null
  };
  isModal: boolean;
  @ViewChild('ccImage') ccImage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public loadingService: LoadingService,
              public storage: Storage,
              public alertService: AlertService,
              public sharedService: SharedService,
              public imageViewerCtrl: ImageViewerController,
              public usersService: UsersService) {


    this.CardData = this.navParams.get('card') || this.CardData;
    this.isEditable = this.navParams.get('isEditable');
    this.cardIndex = this.navParams.get('index');
    if (this.navParams.get('card')) {
      this.CardData.CardNumber = null;
    }
    if (this.navParams.get('isModal')) {
      this.isModal = this.navParams.get('isModal');
    }


    //Form validations
    this.CardForm = formBuilder.group({
      Cardholder: ['', Validators.compose([
        Validators.required
      ])],
      CardNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$'),
      ])],
      CCV: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
      ])],
      ExpMonth: ['', Validators.compose([
        Validators.required
      ])],
      ExpYear: ['', Validators.compose([
        Validators.required
      ])],
        Cardaddress: ['', Validators.compose([
            Validators.required
        ])],
    });


  }

  ionViewDidLoad() {
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
        data.data.card.card_number_plain = this.CardData.CardNumber;
          data.data.card.address = this.CardData.Cardaddress;
        this.loadingService.dismiss();

        if (!this.sharedService.UserData.Cards) {
          this.sharedService.UserData.Cards = [];
        }
        if (this.isEditable) {
          this.sharedService.UserData.Cards[this.cardIndex] = data.data;
        } else {
          this.sharedService.UserData.Cards.push(data.data);
        }
        this.usersService.registerCard(this.sharedService.UserData, data.data);

        this.storage.set('UserData', this.sharedService.UserData);
        this.navCtrl.pop();

      }, (error) => {
        console.log(error);
        this.loadingService.dismiss();
        this.alertService.createAlertError();
      });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  showCreditCardExample() {
    const imageViewer = this.imageViewerCtrl.create(this.ccImage.nativeElement);
    imageViewer.present();
  }

  changeCVV(value){
        //manually launch change detection
      if(value.toString().length <= 4){
          this.CardData.CCV = value;
      }else{
          this.CardData.CCV = value.substring(0,4);
      }
  }

}
