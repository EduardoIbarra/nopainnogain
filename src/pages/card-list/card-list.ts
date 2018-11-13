import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";
import {AddCardPage} from "../add-card/add-card";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";

@IonicPage()
@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html',
})
export class CardListPage {

  cards: Array<any> = [];
  user: any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public navParams: NavParams,
    public sharedService: SharedService,
    public usersService: UsersService,
    public toastController: ToastController
  ) {
    this.usersService.getUserById(this.sharedService.UserData.uid).valueChanges().subscribe((data) => {
      this.user = data;
      if(this.user.cards) {
        this.user.cards = Object.keys(this.user.cards).map(key => this.user.cards[key]);
        this.deselectAll();
      }
    }, (error) => {
      console.log(error);
    });
  }
  deselectAll() {
    this.user.cards.forEach((uc) => {
      uc.selected = false;
    });
  }
  ionViewDidLoad() {
    this.cards = this.sharedService.UserData.Cards;
    if (!this.cards) {
      this.cards = [];
    } else {
      this.cards.forEach((c) => {
        c.selected = false;
      });
      console.log(this.cards);
    }
  }

  selectCard(card) {
    this.deselectAll();
    card.selected = true;
    /*this.cards.forEach((c, i) => {
      c.selected = i === index;
    });*/
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
    if (action === 'default') {
      let defaultCardFound = false;
      this.user.cards.forEach((c) => {
        if(c.card.default) {
          defaultCardFound = true;
          c.card.default = false;
          this.usersService.registerCard(this.sharedService.UserData, c).then((data) => {
            card.card.default = true;
            this.usersService.registerCard(this.sharedService.UserData, card);
            let toast = this.toastController.create({
              message: 'Tarjeta configurada como favorita',
              position: 'bottom',
              duration: 4000
            });
            toast.present();
          }).catch((error) => {
            console.log(error);
          });
        }
      });
      if (!defaultCardFound) {
        card.card.default = true;
        this.usersService.registerCard(this.sharedService.UserData, card);
        let toast = this.toastController.create({
          message: 'Tarjeta configurada como favorita',
          position: 'bottom',
          duration: 4000
        });
        toast.present();
      }
      console.log(card);
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
    console.log(this.user.cards);
    this.usersService.removeCard(this.sharedService.UserData, this.user.cards[index]);
    this.cards.splice(index, 1);
    this.sharedService.UserData.Cards = this.user.cards;
    this.storage.set('UserData', this.sharedService.UserData);
  }

  addCard(){
    this.navCtrl.push('AddCardPage')
  }
}
