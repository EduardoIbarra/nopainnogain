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
    open: false,
    sections: [
      {title: 'Cómo comprar una visita en LIBERI.', url: '', url_type: 'video'},
      {title: 'Cómo buscar buscar un código QR.', url: '', url_type: 'video'},
      {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: '', url_type: 'video'},
      {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: '', url_type: 'video'},
      {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: '', url_type: 'video'},
      {title: 'Cómo reportar un problema".', url: '', url_type: 'video'},
    ]
  },
    {
      title: 'Reportar un problema',
      open: false,
      sections: [
        {title: 'Problemas con la acpliación',header: true},
        {title: 'El mapa geolocalizador no funciona.', url: null, url_type: null},
        {title: 'a) revisa si tienes la ultima actualizacion', url: '', url_type: 'update'},
        {title: 'b) Reinicia la aplicación', url: '', url_type: ''},
        {title: 'c) Envia un reporte', url: '', url_type: 'send-report'},
        {title: 'La actualizacion no se puede instalar', url: null, url_type: null},
        {title: 'a) Intentar nuevamente', url: '', url_type: 'update'},
        {title: 'b) Envia un reporte', url: '', url_type: 'send-report'},
        {title: 'Problemas con mi cuenta',  header: true},
        {title: 'Mi perfil', url: null, url_type: null},
        {title: 'Modificar mis datos personales', url: '', url_type: 'video'},
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
