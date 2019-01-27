import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ToastController,
  Content
} from 'ionic-angular';
import {SharedService} from "../../services/shared.service";
import {GymService} from "../../services/gym.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {PaymentService} from "../../services/payment.service";
import {HelpService} from "../../services/help.service";
import {ReportPage} from "../modals/report/report";

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  @ViewChild(Content) content: Content;
  currentUser: any;
  purchaseHistory: any = [];
  chargeHistory: any = [];
  entriesHistory: any = [];
  tutorials: any = [];
  sections: any = [
    {title: 'Cómo comprar una visita en LIBERI.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 1},
    {title: 'Cómo buscar un código QR.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 2},
    {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 3},
    {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 4},
    {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 5},
    {title: 'Cómo reportar un problema".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 6},
    {title: 'Modificar mis datos personales', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 7},
    {title: 'Como comentar un CAF', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 8},
    {title: 'a) Revisa si tienes la última actualización', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
    ];
  articles: any[] = [{
    title: 'Servicio de ayuda',
    class: 'section',
    open: false,
    sections: [
      {title: 'Cómo comprar una visita en LIBERI.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 1},
      {title: 'Cómo buscar un código QR.', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 2},
      {title: 'Cómo agregar o borrar una categoría de tus "Preferencias".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 3},
      {title: 'Cómo buscar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 4},
      {title: 'Cómo contactar un CAF (Centro de Acondicionamiento Físico)".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 5},
      {title: 'Cómo reportar un problema".', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', class: 'child-section', action_label: 'Ver Tutorial', order: 6},
      {title: 'a) Intentar nuevamente', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
    ]
  },
    {
      title: 'Reportar un problema',
      class: 'section',
      open: false,
      sections: [
        {title: 'Problemas con la apliación', class: 'child-section', header: true},
        {title: 'El mapa geolocalizador no funciona.', url: null, url_type: null, action_label: null},
        {title: 'a) Revisa si tienes la última actualización', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
        {title: 'b) Reinicia la aplicación', url: null, url_type: null, action_label: null},
        {title: 'c) Envia un reporte', url: '', url_type: 'send-report', action_label: 'Enviar Reporte'},
        {title: 'La actualización no se puede instalar', url: null, url_type: null, action_label: null},
        {title: 'a) Intentar nuevamente', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial'},
        {title: 'b) Envia un reporte', url: '', url_type: 'send-report', action_label: 'Enviar Reporte'},
        {title: 'Problemas con mi cuenta', class: 'child-section', header: true},
        {title: 'Mi perfil', url: null, url_type: null, action_label: null},
        {title: 'Modificar mis datos personales', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 7},
        {title: 'Cargos no reconocidos', url: '', url_type: 'scrollTo', id: 'reportCharge', action_label: 'Reportar Cargo'},
        {title: 'Mi Código QR', class: 'child-section', header: true},
        {title: 'No recibí mi código QR', url: '', url_type: '', action_label: ''},
        {title: 'Por favor revisa si la compra se realizo exitosamente', url: 'PurchaseHistoryPage', url_type: 'page', action_label: 'Ver Historial de Compras'},
        {title: 'Si no encuentras la compra realizada, no se efectuó el cargo. Por favor intentalo nuevamente.', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Si la compra realizada está en la lista, presionala para abrir y ahí encontrarás tu código QR', url: null, url_type: null, action_label: null, hasBorder: true},
        {title: 'Problemas con el código QR', url: '', url_type: '', action_label: '', class: ''},
        {title: 'Por favor intenta con el código alfanúmerico que viene debajo de tu código QR', url: '', url_type: 'send-code', action_label: 'Enviar código a revisión', hasBorder: true},
        {title: 'Centros de Acondicionamiento Fisico', class: 'child-section', header: true},
        {title: 'Como comentar un CAF', url: 'https://www.youtube.com/watch?v=JF-Fkbm0XjU', url_type: 'video', action_label: 'Ver Tutorial', order: 8},
      ]
    },
    {
      title: 'Aviso de Privacidad',
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
    {
      title: 'Términos y Condiciones',
      class: 'section',
      open: false,
      sections: [
        {
          title: '<div class=WordSection1>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span>AVISO\n' +
            'DE TÉRMINOS Y CONDICIONES DE USO PARA LA APLICACIÓN COMERCIAL LIBERI.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >1.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX >BIENVENIDO A LIBERI</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Estos\n' +
            'Términos y Condiciones rigen el uso de Liberi™ y los productos, las funciones,\n' +
            'las aplicaciones, los servicios, las tecnologías y el software que ofrecemos\n' +
            '(los Productos de Liberi™ o Productos), excepto cuando indiquemos expresamente\n' +
            'que se aplican otras condiciones (distintas a estas).</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Al\n' +
            'momento de haber aceptado los Términos y Condiciones al completar el llenado de\n' +
            'su perfil usted se ha comprometido a seguir todas las reglas establecidas en el\n' +
            'presente aviso; así mismo, acepta en su totalidad las condiciones que se\n' +
            'estipulan para el uso de la aplicación y los productos ofertados a través de la\n' +
            'presente plataforma de software, obligándose en todos sus sentidos a cumplir\n' +
            'con lo estipulado en el presente aviso. Para el caso de hacer omisión al\n' +
            'correcto uso de la aplicación, servicio o software proporcionado por Liberi™\n' +
            'reconoce y acepta la(s) pena(s) a la(s) cual(es) pueda ser condenado conforme a\n' +
            'los términos a continuación descritos.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >2.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>¿QUÉ SOMOS?</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Liberi™\n' +
            'es un servicio que funciona a través de una aplicación móvil y una aplicación\n' +
            'web, el cual tiene como principal objetivo el canalizar usuarios a empresas o\n' +
            'personas físicas cuya actividad principal sea que se desempeñen como\n' +
            'prestadores de servicios de gimnasios o centros de acondicionamiento físico.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >3.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>¿CÓMO FUNCIONAMOS?</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Liberi™\n' +
            'se publicita al mercado como una aplicación móvil de descarga gratuita para los\n' +
            'usuarios; así mismo, la aplicación permite al usuario comprar un número\n' +
            'indefinido de visitas las cuales le proporcionarán el acceso al gimnasio o\n' +
            'centro de acondicionamiento físico seleccionado en la compra. Las visitas se\n' +
            'comprarán para acceder única y exclusivamente a los gimnasios o centros de\n' +
            'acondicionamiento físico que sean parte del directorio de la aplicación Liberi™.\n' +
            '</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >4.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>TUS OBLIGACIONES AL REGISTRARTE</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'usuario de los productos </span><span lang=ES-MX style=\'font-size:12.0pt;\n' +
            'line-height:115%;font-family:"Times New Roman"\'>Liberi™ (y productos que la\n' +
            'empresa Liberi™ maneja para dar servicio) se obliga a proporcionar a la empresa\n' +
            'Liberi™ para su registro en la aplicación web y en la aplicación móvil, <b><u>únicamente\n' +
            'información que sea de su propiedad</u></b>. Por lo tanto todas las marcas, nombres\n' +
            'comerciales, logotipos, isotipos, imagotipos, isologos, y en general cualquier\n' +
            'texto, imagen u objeto que sea materia de registro de propiedad industrial,\n' +
            'propiedad intelectual o derechos de autor que el usuario suba a la aplicación\n' +
            'web o a la aplicación móvil de nombre Liberi™ son responsabilidad única y\n' +
            'exclusivamente del usuario. El usuario se compromete a responder legalmente\n' +
            'contra las acciones que en algún momento el o los propietarios de marcas,\n' +
            'nombres comerciales, logotipos, isotipos, imagotipos, isologos, y en general\n' +
            'cualquier texto, imagen u objeto que sea materia de registro de propiedad\n' +
            'industrial, propiedad intelectual o derechos de autor puedan ejercer en contra\n' +
            'de Liberi™ por publicitar material que no pertenece a la propiedad del usuario\n' +
            'y ese subió en su registro argumentando o insinuando ser el propietario de\n' +
            'ello.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Por lo\n' +
            'tanto el usuario desde este momento deslinda a la empresa Liberi™ de cualquier\n' +
            'mal uso de marcas, nombres comerciales, logotipos, isotipos, imagotipos,\n' +
            'isologos, y en general cualquier texto, imagen u objeto que sea materia de\n' +
            'registro de propiedad industrial, propiedad intelectual o derechos de autor que\n' +
            'el usuario suba a la aplicación web o aplicación móvil de nombre Liberi™, ello\n' +
            'a través del registro que se hace al crear un perfil. Ello por el motivo de que\n' +
            'la empresa Liberi™ de buena fe presume que toda la información que el usuario\n' +
            'suba en su registro le pertenece legalmente al usuario.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'cliente sabe y entiende a la perfección que si la empresa Liberi™ llega a ser\n' +
            'demandada a través de cualquier juzgado o tribunal nacional, extranjero o\n' +
            'internacional, por motivo de mal uso de marcas, nombres comerciales, logotipos,\n' +
            'isotipos, imagotipos, isologos, y en general cualquier texto, imagen u objeto\n' +
            'que sea materia de registro de propiedad industrial, propiedad intelectual o\n' +
            'derechos de autor que el usuario haya proporcionado a la empresa Liberi™ en su\n' +
            'registro, la empresa Liberi™ entablará acciones legales para deslindar dicha\n' +
            'responsabilidad y las acciones legales ejercitadas en su contra las encaminará\n' +
            'hacia el usuario, y a su vez la empresa Liberi™ entablará acciones legales por\n' +
            'daños morales y responsabilidad civil o penal, según sea el caso.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'usuario se obliga a que toda la información que suba a su perfil será acorde y\n' +
            'conforme a la moral y a las buenas costumbres del territorio nacional mexicano.\n' +
            'Por lo tanto se obliga a que de ninguna manera el texto o fotografías que suba\n' +
            'contendrán palabras altisonantes, vulgares, de las consideradas “<i>doble\n' +
            'sentido</i>”, ni incitarán a la sexualidad explícita, ni a la pornografía, ni a\n' +
            'la violencia, ni a la discriminación, ni al maltrato animal, ni a cualquier\n' +
            'otra actividad que pueda ser considerada como un delito, una falta\n' +
            'administrativa o una falta a la moral acorde a las leyes, reglamentos y\n' +
            'costumbres del territorio nacional mexicano. Las prohibiciones que en este\n' +
            'párrafo se mencionan son a manera enunciativa más no limitativa.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'usuario sabe y reconoce que toda la información que suba a su cuenta o perfil\n' +
            'será revisada eventualmente por el departamento designado para ello por la\n' +
            'empresa Liberi™ de manera aleatoria o bajo petición o reporte de algún usuario.\n' +
            'Así mismo, si el usuario realiza modificaciones a su información general de\n' +
            'contacto esta será igualmente revisada por el departamento designado para ello\n' +
            'por la empresa Liberi™, bajo los términos citados en el presente párrafo.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >5.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>LOS PERMISOS QUE NOS CONCEDES</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Para\n' +
            'proporcionar nuestros servicios, necesitamos que nos concedas determinados\n' +
            'permisos, y al momento de aceptar los Términos y Condiciones nos otorgas los\n' +
            'siguientes permisos: </span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph style=\'margin-left:18.0pt;text-align:justify;\n' +
            'text-indent:-18.0pt\'><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>5.1<span >&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>Permiso para usar tu información personal para\n' +
            'nuestros archivos personales: Tu información personal es de suma importancia, y\n' +
            'por ello la empresa Liberi™ está comprometida al resguardo de la misma, así\n' +
            'como la no divulgación a terceros ajenos a la empresa. Tu información será manejada\n' +
            'por personal oficial de la empresa Liberi™ el cual estará altamente calificado\n' +
            'bajo los estándares más estrictos de las regulaciones sobre protección a datos\n' +
            'personales, y sólo será consultada en caso de que la empresa Liberi™ así lo\n' +
            'decida para fines internos.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph style=\'margin-left:18.0pt;text-align:justify;\n' +
            'text-indent:-18.0pt\'><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>5.2<span >&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>Permiso para usar tu información personal para\n' +
            'contenido público: Tú eres dueño del contenido que creas y compartes en nuestra\n' +
            'plataforma Liberi™ y los demás Productos de Liberi™ que puedas usar, y ninguna\n' +
            'disposición incluida en estas Condiciones anula los derechos que tienes sobre dicho\n' +
            'contenido. Puedes compartir libremente tu contenido con quien quieras y donde\n' +
            'quieras. No obstante, para brindar nuestros servicios, debes concedernos\n' +
            'algunos permisos legales con el fin de usar ese contenido. En concreto, cuando\n' +
            'compartes, publicas o subes contenido que se encuentra protegido por derechos\n' +
            'de propiedad intelectual (como fotos o videos) en nuestros Productos, o en\n' +
            'relación con ellos, nos otorgas una licencia internacional, libre de regalías,\n' +
            'sublicenciable, transferible y no exclusiva para alojar, usar, distribuir,\n' +
            'modificar, publicar, copiar, mostrar o exhibir públicamente y traducir tu\n' +
            'contenido, así como para crear trabajos derivados de él. En otras palabras, si\n' +
            'compartes un video, una foto, un texto o una recomendación en Liberi™, nos\n' +
            'concedes permiso para almacenarla, copiarla y compartirla con otros, como\n' +
            'proveedores de servicios que usan nuestros servicios u otros Productos de Liberi™\n' +
            'que usas. Puedes eliminar el contenido o tu cuenta en cualquier momento para\n' +
            'interrumpir esta licencia. Debes saber que, por motivos técnicos, el contenido\n' +
            'que eliminas puede permanecer durante un tiempo limitado en copias de seguridad\n' +
            '(pero los demás usuarios no podrán verlo). Asimismo, existe la posibilidad de\n' +
            'que el contenido que eliminas puede seguir apareciendo si lo compartiste con\n' +
            'otros y estos no lo eliminaron.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph style=\'margin-left:18.0pt;text-align:justify;\n' +
            'text-indent:-18.0pt\'><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>5.3<span >&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>Permiso para usar tu nombre, foto del perfil e información\n' +
            'sobre las acciones que realizas con anuncios y contenido patrocinado: Nos\n' +
            'concedes permiso para usar tu nombre y foto del perfil e información sobre las\n' +
            'acciones que realizas en Liberi™ junto a anuncios, ofertas y otro contenido\n' +
            'patrocinado que mostramos en nuestros Productos, o en relación con ellos, sin\n' +
            'que recibas compensación de ningún tipo. Por ejemplo, podemos mostrar a otros\n' +
            'usuarios tus comentarios sobre algún gimnasio o centro de acondicionamiento\n' +
            'físico, así como tu foto de perfil o la calificación que le otorgaste a alguno\n' +
            'de los gimnasios o centro de acondicionamiento físico que nos paga para mostrar\n' +
            'sus anuncios en Liberi™. Se muestra este tipo de anuncios o acciones a las\n' +
            'personas que entran a ver los comentarios o calificaciones de algún gimnasio o\n' +
            'centro de acondicionamiento físico.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph style=\'margin-left:18.0pt;text-align:justify;\n' +
            'text-indent:-18.0pt\'><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>5.4<span >&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>Permiso para actualizar el software que usas o\n' +
            'descargas: Si descargas o usas nuestro software, nos concedes permiso para\n' +
            'descargar e instalar actualizaciones, versiones más recientes y funciones adicionales\n' +
            'a fin de mejorarlo y desarrollarlo aún más. Adicionalmente aceptas y reconoces\n' +
            'que al no permitir a nuestro software actualizarse en tu dispositivo móvil,\n' +
            'generarás un malfuncionamiento en la aplicación de tu dispositivo, por lo cual\n' +
            'es posible que no puedas utilizar la aplicación móvil de manera correcta o\n' +
            'incluso que no puedas tener acceso a ella sin antes actualizarla.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph style=\'margin-left:18.0pt;text-align:justify\'><span\n' +
            '      lang=ES-MX >&nbsp;</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >6.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>MODO DE USO DEL SERVICIO Y ALCANCES</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Los\n' +
            'gimnasios o centros de acondicionamiento físico que estén inscritos en la\n' +
            'aplicación se comprometen a tener en sus instalaciones una computadora con\n' +
            'acceso a internet, o en su caso una Tablet con cámara y acceso a internet, o en\n' +
            'su caso un celular de los denominados SmartPhone con cámara y acceso a\n' +
            'internet. Ello para que a través de cualquiera de los aparatos antes citados en\n' +
            'el presente párrafo se pueda leer el código QR que el usuario presentará para\n' +
            'validar su acceso al establecimiento. Si el código QR no puede ser leído por la\n' +
            'cámara del aparato, se podrá escribir el código alfanumérico que se encuentra\n' +
            'debajo del código QR en el cuadro de validación de códigos que se encuentra <span\n' +
            '        style=\'background:yellow\'>en la aplicación móvil o desde la</span> página de\n' +
            'internet </span><span lang=ES-MX><a href="http://www.liberi.com"><span\n' +
            '      >www.liberi.com</span></a></span><span\n' +
            '      class=MsoHyperlink><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>.mx</span></span><span lang=ES-MX\n' +
            '                                                      > en el\n' +
            'perfil del gimnasio o centro de acondicionamiento físico, y así verificar el\n' +
            'código y en su caso validarlo para permitirle al usuario el acceso al\n' +
            'establecimiento. En&nbsp; caso de que el usuario no cuente con el código QR ni\n' +
            'con el código alfanumérico, el gimnasio o centro de acondicionamiento físico no\n' +
            'está obligado a permitirle el acceso a dicho usuario, ya que es obligación del\n' +
            'usuario presentar su código QR o en su caso el código alfanumérico que aparece\n' +
            'abajo del código QR para poder acceder al establecimiento del gimnasio o centro\n' +
            'de acondicionamiento físico.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><b><span lang=ES-MX\n' +
            '                                                           >E</span></b><span\n' +
            '      lang=ES-MX >l\n' +
            'gimnasio o centro de acondicionamiento físico se obliga a prestar servicio de\n' +
            'atención a todos los usuarios que lleguen a su negocio por parte de la aplicación\n' +
            'Liberi™ y le pidan leer el código QR o el código alfanumérico que la aplicación\n' +
            'otorga cuando se realiza la compra de una visita.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Así\n' +
            'mismo, el gimnasio o centro de acondicionamiento físico se obliga a permitirle\n' +
            'el acceso a dicho usuario siempre y cuando el código QR o el código\n' +
            'alfanumérico que el usuario proporcione sean válidos.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'gimnasio o centro de acondicionamiento físico se obliga a tratar a los usuarios\n' +
            'de Liberi™ que ingresen a su negocio con todas las atenciones, formalidades,\n' +
            'diligencia, respeto y educación. Dándoles un trato digno, apropiado y\n' +
            'conveniente como si fueran usuarios propios del establecimiento del gimnasio o\n' +
            'centro de acondicionamiento físico, permitiéndoles el uso, goce y disfrute del\n' +
            'establecimiento, de sus instalaciones, acceso a sanitarios, regaderas y\n' +
            'aparatos que se ofertan a los usuarios propios del establecimiento, así como\n' +
            'atenciones de todo el personal que labore para el gimnasio o centro de\n' +
            'acondicionamiento físico, (los adjetivos utilizados en este párrafo son a manera\n' +
            'enunciativa mas no limitativa, el gimnasio o centro de acondicionamiento físico\n' +
            'entiende y acepta que debe tratar con valores a los usuarios de Liberi™ que\n' +
            'lleguen a su establecimiento).</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'gimnasio o centro de acondicionamiento físico tendrá que contar con un\n' +
            'reglamento interno, el cual deberá tener a la vista o permitir el fácil y\n' +
            'gratuito acceso para que los usuarios de Liberi™ que ingresen a su\n' +
            'establecimiento lo puedan leer. Los usuarios <b><u>TIENEN LA OBLIGACIÓN\n' +
            'IRRENUNCIABLE DE ACATAR EN SU TOTALIDAD EL REGLAMENTO INTERNO DEL GIMNASIO O\n' +
            'CENTRO DE ACONDICIONAMIENTO FÍSICO AL CUAL INGRESAN PARA HACER USO DE SUS\n' +
            'INSTALACIONES</u></b>.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'gimnasio o centro de acondicionamiento físico tiene total y absoluta libertad\n' +
            'de expulsar de su establecimiento a un usuario de Liberi™ cuando ese incumpla\n' +
            'con algún punto del reglamento interno del establecimiento del gimnasio o\n' +
            'centro de acondicionamiento físico. Así mismo, si algún usuario de Liberi™\n' +
            'causara de manera directa o indirecta al establecimiento del gimnasio o centro\n' +
            'de acondicionamiento físico, a su personal o a otros usuarios del\n' +
            'establecimiento del gimnasio o centro de acondicionamiento físico algún\n' +
            'percance, falta administrativa, faltas a la moral o delito, el gimnasio o\n' +
            'centro de acondicionamiento físico llamará a las autoridades pertinentes para\n' +
            'que se proceda conforme a derecho corresponde. La empresa Liberi™ será\n' +
            'notificada de dicho altercado y se tomarán las medidas pertinentes en contra de\n' +
            'dicho usuario, las cuales pueden llegar a ser incluso la inhabilitación\n' +
            'definitiva de su cuenta y la cooperación con autoridades para determinar una\n' +
            'pena según disponga la ley (sin incurrir en violaciones a la privacidad ni a la\n' +
            'protección de datos personales de sus usuarios).</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >7.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>CADUCIDAD DE LA VISITA</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Cuando\n' +
            'un usuario compra una visita no está obligado a utilizarla ese mismo día, será\n' +
            'decisión de él utilizarla cuando sea su voluntad.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >El\n' +
            'párrafo inmediato anterior contempla ciertas condiciones. El gimnasio o centro\n' +
            'de acondicionamiento físico se obliga a respetar y asegurar que el o los\n' +
            'usuarios que hayan comprado una visita para su establecimiento puedan acceder\n' +
            'al mismo y disfrutar de los beneficios que le brinda dicho establecimiento\n' +
            'dentro de los días y horarios que el gimnasio o centro de acondicionamiento\n' +
            'físico haya asignado en su perfil, mismo que puede ser consultado en la\n' +
            'aplicación móvil de la empresa Liberi™. Dicha obligación del gimnasio o centro\n' +
            'de acondicionamiento físico durará solamente 15 días naturales inmediatos\n' +
            'posteriores a la compra de dicha visita. En el entendido de que pasados esos 15\n' +
            'días si el establecimiento del gimnasio o centro de acondicionamiento físico decide\n' +
            'cerrar al público de manera definitiva o indefinida, el gimnasio o centro de\n' +
            'acondicionamiento físico no incurrirá en ninguna falta y no tendrá la\n' +
            'obligación de restituir cantidad alguna al o los usuarios que hayan comprado\n' +
            'una visita para su establecimiento y no la hayan usado todavía.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Si el\n' +
            'gimnasio o centro de acondicionamiento físico decide por cualquier motivo\n' +
            'cerrar su establecimiento de manera definitiva o indefinida, deberá avisa por\n' +
            'lo menos con 30 días naturales de anticipación a dicho cierre a la empresa\n' +
            'Liberi™ para que esa anuncie en la aplicación móvil que el establecimiento del\n' +
            'gimnasio o centro de acondicionamiento físico cerrará al público en determinada\n' +
            'fecha. Los usuarios que aun así decidan comprar alguna visita para dicho\n' +
            'establecimiento, lo harán bajo su responsabilidad y a riesgo de perder la\n' +
            'visita si no la utilizan antes de la fecha de cierre del gimnasio o centro de\n' +
            'acondicionamiento físico. Si el gimnasio o centro de acondicionamiento físico\n' +
            'realiza el trámite mencionado en el presente párrafo no incurrirá en ningún\n' +
            'tipo de pena o sanción, si el gimnasio o centro de acondicionamiento físico\n' +
            'incumple con lo estipulado en el presente párrafo, se hará acreedor al cobro de\n' +
            'las cantidades que genere como deuda a los usuarios que hayan perdido la o las\n' +
            'visitas por responsabilidad del gimnasio o centro de acondicionamiento físico\n' +
            'al incumplir a lo estipulado en el presente párrafo.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >8.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>DISPOSICIONES ADICIONALES</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >8.1.\n' +
            'Actualización de nuestras Condiciones</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Trabajamos\n' +
            'continuamente para mejorar nuestros servicios y desarrollar nuevas funciones a\n' +
            'fin de brindar tanto a ti como a nuestra comunidad Productos óptimos. A raíz de\n' +
            'esto, es posible que, de vez en cuando, debamos actualizar estas Condiciones\n' +
            'para reflejar con precisión nuestros servicios y prácticas. A menos que la ley\n' +
            'disponga lo contrario, te enviaremos una notificación antes de modificar estas\n' +
            'Condiciones y tendrás la oportunidad de revisar los cambios antes de que entren\n' +
            'en vigor. Una vez que cualquier actualización a las Condiciones esté en\n' +
            'vigencia, quedarás sujeto a estas si continúas usando nuestros Productos.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Esperamos\n' +
            'que sigas usando nuestros Productos. No obstante, si no aceptas nuestras\n' +
            'Condiciones actualizadas y ya no quieres formar parte de la comunidad de Liberi™,\n' +
            'puedes eliminar tu cuenta en cualquier momento.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >8.2.\n' +
            'Suspensión o cancelación de la cuenta</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Queremos\n' +
            'que Liberi™ sea un lugar donde las personas se sientan bienvenidas y seguras\n' +
            'para ejercitarse, comunicarse, expresarse y compartir opiniones e ideas.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Si\n' +
            'determinamos que incumpliste nuestras condiciones o políticas, podemos tomar\n' +
            'medidas en relación con tu cuenta para proteger a nuestra comunidad y los\n' +
            'servicios que ofrecemos, incluido inhabilitar la cuenta o suspender el acceso a\n' +
            'ella. También podemos suspender o inhabilitar tu cuenta si supones un riesgo\n' +
            'para nosotros o generas exposición legal, o bien si la ley así nos lo exige.\n' +
            'Cuando corresponda, te enviaremos una notificación para indicarte si se tomaron\n' +
            'medidas en relación con tu cuenta la próxima vez que intentes acceder a ella.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Si tú\n' +
            'eliminas o nosotros inhabilitamos tu cuenta, estas Condiciones cesarán como un\n' +
            'acuerdo entre tú y nosotros, sin embargo las obligaciones a las cuales te hayas\n' +
            'comprometido deberán ser cubiertas, específicamente a las de pago por los\n' +
            'servicios. Es decir, si tú como usuario compras visitas a un gimnasio o centro\n' +
            'de acondicionamiento físico y antes de usarlas cancelas tu cuenta o la empresa Liberi™\n' +
            'decide inhabilitarla definitivamente por causa del incumplimiento de tu parte\n' +
            'de las normas y condiciones aquí estipuladas, el cobro de dichas visitas se te\n' +
            'habrá hecho al momento de cada compra y su pago no te será devuelto,\n' +
            'reintegrado o remunerado de ninguna otra forma.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >9.<span\n' +
            '      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
            '</span></span><span lang=ES-MX style=\'font-size:12.0pt;line-height:115%;\n' +
            'font-family:"Times New Roman"\'>LÍMITES DE RESPONSABILIDAD</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Nos\n' +
            'esforzamos por proporcionar los mejores Productos posibles y definir pautas\n' +
            'claras para todos aquellos que los usen. No obstante, nuestros Productos se\n' +
            'proporcionan tal como están y no podemos garantizar que siempre serán seguros,\n' +
            'nunca tendrán errores o funcionarán sin interrupciones, demoras o\n' +
            'imperfecciones. En la medida en que la ley lo permita, también RENUNCIAMOS A\n' +
            'TODA GARANTÍA, EXPRESA O IMPLÍCITA, INCLUIDAS LAS GARANTÍAS IMPLÍCITAS DE\n' +
            'COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR, TÍTULO Y NO INFRACCIÓN. No\n' +
            'controlamos ni dirigimos lo que los usuarios u otros hacen o dicen, ni somos\n' +
            'responsables por sus acciones o conductas (dentro o fuera de internet) ni por\n' +
            'el contenido (fotos, videos o comentarios) que comparten, incluido contenido\n' +
            'ofensivo, inapropiado, obsceno, ilegal o cuestionable.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >No\n' +
            'podemos predecir cuándo puede surgir un problema con nuestros Productos. En\n' +
            'consecuencia, nuestra responsabilidad se limitará al máximo alcance que la ley\n' +
            'aplicable permita, y bajo ninguna circunstancia seremos responsables por la\n' +
            'pérdida de ganancias, ingresos o información, ni por daños consecuentes,\n' +
            'especiales, indirectos, ejemplares, punitivos o incidentales que surjan a raíz\n' +
            'de estas Condiciones o los Productos de Liberi™, o en relación con ellos,\n' +
            'incluso si se nos advirtió sobre la posibilidad de que ocurran dichos daños.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >10.<span\n' +
            '      >&nbsp;&nbsp; </span></span><span\n' +
            '      lang=ES-MX >CONFLICTOS</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Intentamos\n' +
            'imponer reglas claras para poder limitar o, mejor aún, evitar disputas contigo.\n' +
            'No obstante, si surge alguna disputa, es útil saber con anticipación dónde se\n' +
            'puede resolver y qué leyes se aplican.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Como usuario\n' +
            'deberás atenerte a las leyes del país donde resides, se aplicarán a cualquier\n' +
            'reclamación, causa o disputa (&quot;reclamación&quot;) que presentes contra\n' +
            'nosotros y que surja como consecuencia de estas Condiciones o los Productos de Liberi™,\n' +
            'o en relación con ellos. Asimismo, puedes resolver la reclamación en cualquier\n' +
            'tribunal competente del país que tenga jurisdicción. En todos los demás casos,\n' +
            'aceptas que la reclamación se debe resolver de forma exclusiva en los Juzgados\n' +
            'de Primera Instancia de la Ciudad de Guadalajara, Jalisco, o en el Tribunal de\n' +
            'Distrito del estado de Jalisco; aceptas someterte a la jurisdicción personal de\n' +
            'cualquiera de estos tribunales con el propósito de litigar cualquier\n' +
            'reclamación; y aceptas también que las leyes del estado de Jalisco regirán\n' +
            'estas Condiciones, así como cualquier reclamación, independientemente de las\n' +
            'disposiciones sobre conflictos de leyes.</span></p>\n' +
            '\n' +
            '    <p class=MsoListParagraph ><span\n' +
            '      lang=ES-MX >11.<span\n' +
            '      >&nbsp;&nbsp; </span></span><span\n' +
            '      lang=ES-MX >OTRO</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Estas\n' +
            'Condiciones constituyen la totalidad del acuerdo entre tú y Liberi™ respecto\n' +
            'del uso de nuestros Productos y prevalecen sobre cualquier acuerdo anterior.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Si se\n' +
            'determina que alguna disposición de estas Condiciones no se puede ejecutar, las\n' +
            'disposiciones restantes seguirán en plena vigencia. Si no podemos ejecutar\n' +
            'alguna de estas Condiciones, ello no se considerará una exención a su\n' +
            'cumplimiento. Cualquier modificación o exención de estas Condiciones debe\n' +
            'hacerse por escrito y estar firmada por nosotros.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >No\n' +
            'transferirás ninguno de tus derechos u obligaciones en virtud de estas\n' +
            'Condiciones a ningún tercero sin nuestro consentimiento.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Estas\n' +
            'Condiciones no confieren derechos de beneficiario a ningún tercero. Podemos\n' +
            'asignar libremente todos nuestros derechos y todas nuestras obligaciones en\n' +
            'virtud de estas Condiciones en caso de fusión, adquisición o venta de activos,\n' +
            'por aplicación de la ley o de algún otro modo.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Valoramos\n' +
            'siempre tus comentarios y cualquier otra sugerencia sobre nuestros productos y\n' +
            'servicios. No obstante, te informamos que podemos usarlos sin restricción u\n' +
            'obligación alguna de brindarte una compensación, y no tenemos la obligación de\n' +
            'mantenerlos en confidencialidad.</span></p>\n' +
            '\n' +
            '    <p style=\'text-align:justify\'><span lang=ES-MX\n' +
            '                                                        >Nos\n' +
            'reservamos todos los derechos que no te hayamos concedido de forma expresa.</span></p>\n' +
            '\n' +
            '    <p align=right style=\'text-align:right\'><b><span lang=ES-MX\n' +
            '                                                                     style=\'font-family:"Times New Roman"\'>Fecha de la última revisión: 29 de octubre\n' +
            'de 2018.</span></b></p>\n' +
            '\n' +
            '  </div>',
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
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {

    this.authService.getStatus().subscribe((result) => {
      this.currentUser = result;
      this.getUserGymHistoryPurchase();
    });
  }


  ionViewDidLoad() {
    this.getTutorials();
  }

  getTutorials() {
    this.helpService.getTutorials().valueChanges().subscribe((tutorials: any) => {
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
      payments = Object.keys(payments).map(key => payments[key]);
      payments.forEach((p) => {
            this.gymService.getGym(p.gym).valueChanges().subscribe((g: any) => {
            if(g){
                this.purchaseHistory.push(g);
                this.purchaseHistory[this.purchaseHistory.length - 1].purchase_code = p.generated_code;
                this.purchaseHistory[this.purchaseHistory.length - 1].status = p.status;
                this.purchaseHistory[this.purchaseHistory.length - 1].purchase_price = p.amount;
                this.purchaseHistory[this.purchaseHistory.length - 1].purchase_date = p.timestamp;
                this.purchaseHistory[this.purchaseHistory.length - 1].isOpen = false;
                this.purchaseHistory[this.purchaseHistory.length - 1].openToday = this.sharedService.getGymOpenDays(g);
                this.purchaseHistory[this.purchaseHistory.length - 1].selected = false;
                if (this.purchaseHistory.length < 11) this.chargeHistory.push(this.purchaseHistory[this.purchaseHistory.length - 1]);
                this.entriesHistory = JSON.parse(JSON.stringify(Object.assign([], this.chargeHistory)));
                console.log(this.entriesHistory);
            }
            });
        });
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
    console.log(this.entriesHistory, this.chargeHistory);
    /*let gyms = type === 'entries' ? this.entriesHistory : this.chargeHistory;
    console.log(gyms);
    gyms.filter((gym) => {
      g.selected = gym.purchase_code === g.purchase_code;
    })*/
  }

  reportCharge() {
    const charges = this.chargeHistory.filter( c => c.selected );
    console.log(charges);
    const loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    loader.present();
    const user = this.sharedService.getUserData();
    const report = {
      user: user.uid,
      uid: Date.now(),
      type: 'report_entry',
      records: charges
    };
    this.helpService.sendReport(report).then((data) => {
      console.log(data);
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: '¡Su reporte fue enviado correctamente!',
        duration: 3500
      });
      toast.present().then((data) => {
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
      loader.dismiss();
    });
  }

  reportEntry() {
    const entries = this.entriesHistory.filter( e => e.selected );
    console.log(entries);
    const loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    loader.present();
    const user = this.sharedService.getUserData();
    const report = {
      user: user.uid,
      uid: Date.now(),
      type: 'report_entry',
      records: entries
    };
    this.helpService.sendReport(report).then((data) => {
      console.log(data);
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: '¡Su reporte fue enviado correctamente!',
        duration: 3500
      });
      toast.present().then((data) => {
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
      loader.dismiss();
    });
  }

  selectOption(item) {
    if (item.url_type === 'video') {
      this.sections.filter((t) => {
        if (t.order === item.order) window.open(t.url, '_system');
      })
    }
    if (item.url_type === 'update') {
      alert('Accion pendiente')
    }
    if (item.url_type === 'send-report') {
      let reportModal = this.modalCtrl.create(ReportPage, { type: 'generic' });
      reportModal.present();
    }
    if (item.url_type === 'send-code') {
      let reportModal = this.modalCtrl.create(ReportPage, { type: 'code', payments: this.purchaseHistory });
      reportModal.present();
    }
    if (item.url_type === 'page') {
      this.navCtrl.push(item.url);
    }
    if (item.url_type === 'scrollTo') {
      this.scrollTo(item.id);
    }
  }

  scrollTo(elementId: string) {
    let y = document.getElementById(elementId).offsetTop;
    this.content.scrollTo(0, y);
  }

  goTo(page: string) {
    console.log(page);
    let modal = this.modalCtrl.create(page, {isModal: true});
    modal.present();
  }

}
