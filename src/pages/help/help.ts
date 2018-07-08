import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  articles: any[] = [{
    title: 'Servicio de ayuda',
    class: 'section',
    open: false,
    sections: [
      {title: 'Cómo comprar una visita en LIBERI.', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo buscar buscar un código QR.', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
      {title: 'Cómo reportar un problema".', url: '', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial'},
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
        {title: 'Modificar mis datos personales', url: '', url_type: 'video', action_label: 'Ver Tutorial'},
        {title: 'Cargos no reconocidos', url: '', url_type: 'pending', action_label: 'Reportar Cargo'},
        {title: 'Mi Código QR', class: 'child-section', header: true},
        {title: 'No recibí mi codigo QR', url: '', url_type: '', action_label: ''},
        {title: 'Por favor revisa si la compra se realizo exitosamente', url: 'PurchaseHistoryPage', url_type: 'page', action_label: 'Ver Historial de Compras'},
        {title: 'Si no encuentras la compra realizada, no se efectuó el cargo. Por favor intentalo nuevamente.', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Si la compra realizada está en la lista, presionala para abrir y ahí encontrarás tu codigo QR', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Problemas con el código QR', url: '', url_type: '', action_label: '', class: ''},
        {title: 'Por favor intenta con el código alfanúmerico que viene debajo de tu código QR', url: '', url_type: 'pending', action_label: 'Enviar código a revisión', hasBorder: true},
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
