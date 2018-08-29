import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";
import {GymService} from "../../services/gym.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  currentUser: any;
  purchaseHistory: any = [];
  chargeHistory: any = [];
  entriesHistory: any = [];
  articles: any[] = [{
    title: 'Servicio de ayuda',
    class: 'section',
    open: false,
    sections: [
      {title: 'Cómo comprar una visita en LIBERI.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo buscar buscar un código QR.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo reportar un problema".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
    ]
  },
    {
      title: 'Reportar un problema',
      class: 'section',
      open: false,
      sections: [
        {title: 'Problemas con la apliación', class: 'child-section', header: true},
        {title: 'El mapa geolocalizador no funciona.', url: null, url_type: null, action_label: null},
        {title: 'a) Revisa si tienes la ultima actualizacion', url: '', url_type: 'update', action_label: 'Actualizar'},
        {title: 'b) Reinicia la aplicación', url: null, url_type: null, action_label: null},
        {title: 'c) Envia un reporte', url: '', url_type: 'send-report', action_label: 'Enviar Reporte'},
        {title: 'La actualizacion no se puede instalar', url: null, url_type: null, action_label: null},
        {title: 'a) Intentar nuevamente', url: '', url_type: 'update', action_label: 'Actualizar'},
        {title: 'b) Envia un reporte', url: '', url_type: 'send-report', action_label: 'Enviar Reporte'},
        {title: 'Problemas con mi cuenta', class: 'child-section', header: true},
        {title: 'Mi perfil', url: null, url_type: null, action_label: null},
        {title: 'Modificar mis datos personales', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
        {title: 'Cargos no reconocidos', url: '', url_type: 'pending', action_label: 'Reportar Cargo'},
        {title: 'Mi Código QR', class: 'child-section', header: true},
        {title: 'No recibí mi codigo QR', url: '', url_type: '', action_label: ''},
        {title: 'Por favor revisa si la compra se realizo exitosamente', url: 'PurchaseHistoryPage', url_type: 'page', action_label: 'Ver Historial de Compras'},
        {title: 'Si no encuentras la compra realizada, no se efectuó el cargo. Por favor intentalo nuevamente.', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Si la compra realizada está en la lista, presionala para abrir y ahí encontrarás tu codigo QR', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Problemas con el código QR', url: '', url_type: '', action_label: '', class: ''},
        {title: 'Por favor intenta con el código alfanúmerico que viene debajo de tu código QR', url: '', url_type: 'pending', action_label: 'Enviar código a revisión', hasBorder: true},
        {title: 'Centros de Acondicionamiento Fisico', class: 'child-section', header: true},
        {title: 'Como comentar un CAF', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
      ]
    },
    {
      title: 'Términos y Condiciones',
      class: 'section',
      open: false,
      sections: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.<br><br> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
          innerHtml: true
        },
      ]
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentService: PaymentService,
    public gymService: GymService,
    public sharedService: SharedService,
    public loadingService: LoadingService,
    public authService: AuthService,
  ) {

    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      console.log(result);
      console.log(this.articles);
    });
  }


  ionViewDidLoad() {
    this.getUserGymHistoryPurchase();
  }


  getUserGymHistoryPurchase() {
    this.paymentService.getPaymentsByUser(this.currentUser.uid).valueChanges().subscribe((payments: any) => {
      if (!payments) {
        this.purchaseHistory = [];
        this.chargeHistory = [];
        return;
      }
      console.log(payments);
      payments = Object.keys(payments).map(key => payments[key]);
      this.gymService.getGyms().valueChanges().subscribe((gyms: any) => {
        console.log(gyms);
        payments.map((p) => {
          gyms.forEach((g) => {
            if (p.gym === g.id) {
              this.purchaseHistory.push(g);
              this.purchaseHistory[this.purchaseHistory.length - 1].purchase_code = p.generated_code;
              this.purchaseHistory[this.purchaseHistory.length - 1].status = p.status;
              this.purchaseHistory[this.purchaseHistory.length - 1].purchase_price = p.amount;
              this.purchaseHistory[this.purchaseHistory.length - 1].purchase_date = p.timestamp;
              this.purchaseHistory[this.purchaseHistory.length - 1].isOpen = false;
              this.purchaseHistory[this.purchaseHistory.length - 1].openToday = this.sharedService.getGymOpenDays(g);
              this.purchaseHistory[this.purchaseHistory.length - 1].selected = false;
              if (this.purchaseHistory.length < 11) this.chargeHistory.push(this.purchaseHistory[this.purchaseHistory.length - 1]);
            }
          })
        });
        this.entriesHistory = Object.assign([], this.chargeHistory);
        console.log(this.purchaseHistory);
      })
    }, (error) => {
      this.purchaseHistory = [];
      this.chargeHistory = [];
      console.log(error);
    })
  }

  seeMore(type) {
    if (type === 'entry') {
      for (let i = 0; i < 5; i++) {
        if (this.purchaseHistory[this.entriesHistory.length]) {
          this.entriesHistory.push(this.purchaseHistory[this.entriesHistory.length]);
        }
      }
    }
    if (type === 'charge') {
      for (let i = 0; i < 5; i++) {
        if (this.purchaseHistory[this.chargeHistory.length]) {
          this.chargeHistory.push(this.purchaseHistory[this.chargeHistory.length]);
        }
      }
    }
  }


  reportCharge() {
    let counter = 0;
    this.chargeHistory.filter((c, ci) => {
      if (c.selected) counter++;
      if (counter && ci === this.chargeHistory.length - 1) this.navCtrl.push('ReportChargePage')
    });
  }

  reportEntry() {
    let counter = 0;
    this.entriesHistory.filter((c, ci) => {
      if (c.selected) counter++;
      if (counter && ci === this.entriesHistory.length - 1) this.navCtrl.push('ReportChargePage')
    });
  }

  selectOption(item) {
    if (item.url_type === 'video') {
      window.open(item.url, '_system');
      //TODO: get video from ulr and match id
    }
    if (item.url_type === 'update') {
      alert('Accion pendiente')
    }
    if (item.url_type === 'send-report') {
      alert('Accion pendiente')
    }
    if (item.url_type === 'page') {
      this.navCtrl.push(item.url);
    }
  }

}
