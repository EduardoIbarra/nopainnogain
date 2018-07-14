import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";
import {AddCardPage} from "../add-card/add-card";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html',
})
export class CardListPage {

  cards: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public navParams: NavParams,
    public sharedService: SharedService,
  ) {
  }

  ionViewDidLoad() {
    this.cards = this.sharedService.UserData.Cards;
    this.cards.forEach((c) => {
      c.selected = false;
    });
    console.log(this.cards);
  }

  selectCard(index) {
    this.cards.forEach((c, i) => {
      c.selected = i === index;
    });
  }

  action(card, action,index) {
    if (action === 'edit') {
      let c = {
        CardNumber: card.card_number,
        Cardholder: card.holder_name,
        ExpYear: card.expiration_year,
        ExpMonth: card.expiration_month,
        CCV: card.cvv2
      };

      this.navCtrl.push('AddCardPage', {card: c, index: index, isEditable: true})
    }
    if(action === 'remove'){
      this.alertCtrl.create({
        title: 'Eliminar Tarjeta',
        subTitle: '¿Deseas eliminar esta tarjeta?',
        buttons: [{
          text: 'Cancelar'
        },{
          text: 'Eliminar',
          handler: ()=>{
            this.deleteCard(index);
          }
        }
        ]
      }).present();
    }
  }

  deleteCard(index){
    this.cards.splice(index, 1);
    this.sharedService.UserData.Cards = this.cards;
    this.storage.set('UserData', this.sharedService.UserData);
  }

  addCard(){
    this.navCtrl.push('AddCardPage')
  }

}
