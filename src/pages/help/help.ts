import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";
import {GymService} from "../../services/gym.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";
import {HelpService} from "../../services/help.service";

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
  tutorials: any = [];
  articles: any[] = [{
    title: 'Servicio de ayuda',
    class: 'section',
    open: false,
    sections: [
      {title: 'Cómo comprar una visita en LIBERI.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 1},
      {title: 'Cómo buscar buscar un código QR.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 2},
      {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 3},
      {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 4},
      {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 5},
      {title: 'Cómo reportar un problema".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 6},
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
        {title: 'Modificar mis datos personales', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 7},
        {title: 'Cargos no reconocidos', url: '', url_type: 'pending', action_label: 'Reportar Cargo'},
        {title: 'Mi Código QR', class: 'child-section', header: true},
        {title: 'No recibí mi codigo QR', url: '', url_type: '', action_label: ''},
        {title: 'Por favor revisa si la compra se realizo exitosamente', url: 'PurchaseHistoryPage', url_type: 'page', action_label: 'Ver Historial de Compras'},
        {title: 'Si no encuentras la compra realizada, no se efectuó el cargo. Por favor intentalo nuevamente.', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Si la compra realizada está en la lista, presionala para abrir y ahí encontrarás tu codigo QR', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Problemas con el código QR', url: '', url_type: '', action_label: '', class: ''},
        {title: 'Por favor intenta con el código alfanúmerico que viene debajo de tu código QR', url: '', url_type: 'pending', action_label: 'Enviar código a revisión', hasBorder: true},
        {title: 'Centros de Acondicionamiento Fisico', class: 'child-section', header: true},
        {title: 'Como comentar un CAF', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 8},
      ]
    },
    {
      title: 'Términos y Condiciones',
      class: 'section',
      open: false,
      sections: [
        {
          title: '<p class="p1"><strong>AVISO DE PRIVACIDAD </strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1">Melius Motus Corporis, S.A. de C.V., mejor conocido como Liberi, con domicilio en calle General San Mart&iacute;n 208 - B220, colonia Americana, ciudad Guadalajara, municipio o delegaci&oacute;n Guadalajara, C.P. 44160, en la entidad de Jalisco, pa&iacute;s M&eacute;xico, y portal de internet <a href="http://www.liberi.com.mx">www.liberi.com.mx</a>, es el responsable del uso y protecci&oacute;n de sus datos personales, y al respecto le informamos lo siguiente:</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1"><strong>&iquest;Para qu&eacute; fines utilizaremos sus datos personales? </strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Para verificar la identidad de los clientes que se registren.</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Para coordinar la canalizaci&oacute;n de los clientes con los prestadores de servicios.</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Para encaminar cualquier tipo de responsabilidad civil, penal o administrativa que pudiera llegar a generarse por el mal uso que un cliente d&eacute; a la aplicaci&oacute;n o a las instalaciones de los prestadores de servicios.</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Para generar un esquema de preferencias sobre los gustos del cliente y ofrecerle lo &oacute;ptimo para su recreaci&oacute;n.</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Prospecci&oacute;n comercial.</p>\n' +
          '<p class="p1"><br />De manera adicional, utilizaremos su informaci&oacute;n personal para las siguientes finalidades secundarias que <strong>no son necesarias</strong> para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atenci&oacute;n:</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Para solicitarle informaci&oacute;n con fines de mercadotecnia y ofrecer productos o servicios relacionados con el giro del negocio.</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Mercadotecnia o publicitaria.</p>\n' +
          '<p class="p1">En caso de que no desee que sus datos personales se utilicen para estos fines secundarios, ind&iacute;quelo a continuaci&oacute;n:<br /><br />No consiento que mis datos personales se utilicen para los siguientes fines:<br /><br />[&nbsp;&nbsp;]&nbsp;Para solicitarle informaci&oacute;n con fines de mercadotecnia y ofrecer productos o servicios relacionados con el giro del negocio.<br />[&nbsp;&nbsp;]&nbsp;Mercadotecnia o publicitaria .</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1"><br />La negativa para el uso de sus datos personales para estas finalidades no podr&aacute; ser un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1"><strong>&iquest;Qu&eacute; datos personales utilizaremos para estos fines? </strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Nombre</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Fecha de nacimiento</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Domicilio</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Tel&eacute;fono celular</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Correo electr&oacute;nico</p>\n' +
          '<p class="p1"><span class="Apple-converted-space">&nbsp; </span>Fotograf&iacute;a</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1"><strong><br />&iquest;C&oacute;mo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso? </strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Usted tiene derecho a conocer qu&eacute; datos personales tenemos de usted, para qu&eacute; los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la correcci&oacute;n de su informaci&oacute;n personal en caso de que est&eacute; desactualizada, sea inexacta o incompleta (Rectificaci&oacute;n); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no est&aacute; siendo utilizada adecuadamente (Cancelaci&oacute;n); as&iacute; como oponerse al uso de sus datos personales para fines espec&iacute;ficos (Oposici&oacute;n). Estos derechos se conocen como derechos ARCO.</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Para el ejercicio de cualquiera de los derechos ARCO, usted deber&aacute; presentar la solicitud respectiva a trav&eacute;s del siguiente medio: <br /><br />Enviando un correo electr&oacute;nico a la siguiente direcci&oacute;n: <a href="mailto:derechosarco@liberi.com.mx">derechosarco@liberi.com.mx</a></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Con relaci&oacute;n al procedimiento y requisitos para el ejercicio de sus derechos ARCO, le informamos lo siguiente:</p>\n' +
          '<p class="p1">a) &iquest;A trav&eacute;s de qu&eacute; medios pueden acreditar su identidad el titular y, en su caso, su representante, as&iacute; como la personalidad este &uacute;ltimo?<br />Identificaci&oacute;n oficial vigente (INE, Pasaporte o Cartilla Militar)</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">b) &iquest;Qu&eacute; informaci&oacute;n y/o documentaci&oacute;n deber&aacute; contener la solicitud?<br />Nombre completo, Fecha, Firma, copia de la identificaci&oacute;n oficial vigente con la que acredita su personalidad (ambos lados), objeto de la solicitud</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">c) &iquest;En cu&aacute;ntos d&iacute;as le daremos respuesta a su solicitud?<br />15 d&iacute;as h&aacute;biles</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">d) &iquest;Por qu&eacute; medio le comunicaremos la respuesta a su solicitud?<br />Correo electr&oacute;nico</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">e) &iquest;En qu&eacute; medios se pueden reproducir los datos personales que, en su caso, solicite?<br />Electr&oacute;nicos</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1"><br />Los datos de contacto de la persona o departamento de datos personales, que est&aacute; a cargo de dar tr&aacute;mite a las solicitudes de derechos ARCO, son los siguientes:</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">a) Nombre de la persona o departamento de datos personales: Departamento de Datos Personales<br />b) Domicilio: calle General San Mart&iacute;n 208 - B220, colonia Americana, ciudad Guadalajara, municipio o delegaci&oacute;n Guadalajara, C.P. 44160, en la entidad de Jalisco, pa&iacute;s M&eacute;xico<br /><br /><strong>Usted puede revocar su consentimiento para el uso de sus datos personales</strong><br /><br />Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligaci&oacute;n legal requiramos seguir tratando sus datos personales. Asimismo, usted deber&aacute; considerar que para ciertos fines, la revocaci&oacute;n de su consentimiento implicar&aacute; que no le podamos seguir prestando el servicio que nos solicit&oacute;, o la conclusi&oacute;n de su relaci&oacute;n con nosotros.<br /><br />Para revocar su consentimiento deber&aacute; presentar su solicitud a trav&eacute;s del siguiente medio: <br /><br />Enviando un correo electr&oacute;nico a la siguiente direcci&oacute;n: <a href="mailto:derechosarco@liberi.com.mx">derechosarco@liberi.com.mx</a></p>\n' +
          '<p class="p1"><br />Con relaci&oacute;n al procedimiento y requisitos para la revocaci&oacute;n de su consentimiento, le informamos lo siguiente: <br /><br />a) &iquest;A trav&eacute;s de qu&eacute; medios pueden acreditar su identidad el titular y, en su caso, su representante, as&iacute; como la personalidad este &uacute;ltimo?<br />Identificaci&oacute;n oficial vigente (INE, Pasaporte o Cartilla Militar)<br /><br />b) &iquest;Qu&eacute; informaci&oacute;n y/o documentaci&oacute;n deber&aacute; contener la solicitud?<br />Nombre completo, Fecha, Firma, copia de la identificaci&oacute;n oficial vigente con la que acredita su personalidad (ambos lados), objeto de la solicitud<br /><br />c) &iquest;En cu&aacute;ntos d&iacute;as le daremos respuesta a su solicitud?<br />15 d&iacute;as h&aacute;biles<br /><br />d) &iquest;Por qu&eacute; medio le comunicaremos la respuesta a su solicitud?<br />Electr&oacute;nicos</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1"><strong>&iquest;C&oacute;mo puede limitar el uso o divulgaci&oacute;n de su informaci&oacute;n personal? </strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">Con objeto de que usted pueda limitar el uso y divulgaci&oacute;n de su informaci&oacute;n personal, le ofrecemos los siguientes medios: <br /><br />Enviando un correo electr&oacute;nico a la siguiente direcci&oacute;n: <a href="mailto:derechosarco@liberi.com.mx">derechosarco@liberi.com.mx</a></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1"><strong>El uso de tecnolog&iacute;as de rastreo en nuestro portal de internet</strong><br /><br />Le informamos que en nuestra p&aacute;gina de internet utilizamos cookies, web beacons u otras tecnolog&iacute;as, a trav&eacute;s de las cuales es posible monitorear su comportamiento como usuario de internet, as&iacute; como brindarle un mejor servicio y experiencia al navegar en nuestra p&aacute;gina. Los datos personales que recabamos a trav&eacute;s de estas tecnolog&iacute;as, los utilizaremos para los siguientes fines:<br /><br />Para generar un esquema de preferencias sobre los gustos del cliente y ofrecerle lo &oacute;ptimo para su recreaci&oacute;n<br /><br />Los datos personales que obtenemos de estas tecnolog&iacute;as de rastreo son los siguientes:<br /><br />Identificadores, nombre de usuario y contrase&ntilde;as de una sesi&oacute;n<br />Regi&oacute;n en la que se encuentra el usuario<br />Tipo de navegador del usuario<br />Tipo de sistema operativo del usuario<br />Fecha y hora del inicio y final de una sesi&oacute;n de un usuario</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1"><strong><br />&iquest;C&oacute;mo puede conocer los cambios en este aviso de privacidad?</strong></p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p1">El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras pr&aacute;cticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.<br /><br />Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a trav&eacute;s de: A trav&eacute;s de un correo electr&oacute;nico, as&iacute; como a trav&eacute;s de la p&aacute;gina web y de la aplicaci&oacute;n m&oacute;vil.<br /><br />El procedimiento a trav&eacute;s del cual se llevar&aacute;n a cabo las notificaciones sobre cambios o actualizaciones al presente aviso de privacidad es el siguiente: <br /><br />El usuario recibir&aacute; la notificaci&oacute;n textual de que hubo cambios en el aviso de privacidad y se le proporcionar&aacute; informaci&oacute;n de c&oacute;mo revisar el nuevo aviso de privacidad a trav&eacute;s de la p&aacute;gina web o de la aplicaci&oacute;n m&oacute;vil</p>\n' +
          '<p class="p1">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p2">&nbsp;</p>\n' +
          '<p class="p1">&Uacute;ltima actualizaci&oacute;n: 01/11/2017</p>',
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
    public helpService: HelpService,
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
    this.getTutorials();
  }

  getTutorials() {
    this.helpService.getTutorials().valueChanges().subscribe((tutorials: any) => {
      console.log('TUT', tutorials);
      this.tutorials = tutorials;
    })
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
        console.log(payments);
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
              this.entriesHistory = Object.assign([], this.chargeHistory);
            }
          })
        });
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

  selectGymListItem(g, type) {
    let gyms = type === 'entries' ? this.entriesHistory : this.chargeHistory;
    gyms.filter((gym) => {
      g.selected = gym.purchase_date === g.purchase_date;
    })
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
      this.tutorials.filter((t) => {
        if (t.order === item.order) window.open(t.url, '_system');
      })
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
