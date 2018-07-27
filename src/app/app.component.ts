import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from "@ionic-native/keyboard";
import {Storage} from "@ionic/storage";
import {SharedService} from "../services/shared.service";

declare var OpenPay: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;
  showCardItem: boolean = false;

  pages: Array<{ title: string, component: any, icon: string, show: boolean }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sharedService: SharedService,
              public storage: Storage,
              public keyboard: Keyboard,
              public events: Events) {
    this.initializeApp();


    this.storage.get('UserData').then((UserData) => {
      console.log('UserData: ', UserData);
      this.sharedService.UserData = UserData;
      this.rootPage = UserData ? 'ValidateSessionPage' : 'LoginPage';
      this.sharedService.enableSplitPane = this.rootPage !== 'LoginPage';
    });

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Inicio', component: 'HomePage', icon: 'pin.png', show: true},
      {title: 'Datos Personales', component: 'ProfilePage', icon: 'user.png', show: true},
      {title: 'Datos de tarjeta', component: 'CardListPage', icon: 'card.png', show: false},
      {title: 'Notificaciones', component: 'NotificationsPage', icon: 'notification.png', show: true},
      {title: 'Historial de Compras', component: 'PurchaseHistoryPage', icon: 'history.png', show: true},
      {title: 'Preferencias', component: 'PreferencesPage', icon: 'preferences.png', show: true},
      {title: 'Promociones', component: 'PromotionsPage', icon: 'promos.png', show: true},
      {title: 'Ayuda', component: 'HelpPage', icon: 'help.png', show: true},
      {title: 'Validar Sesión', component: 'ValidateSessionPage', icon: 'qr-code.png', show: true},
      {title: 'Cerrar Sesión', component: null, icon: 'logout.png', show: true}
    ];

    this.activePage = this.pages[0];

    this.events.subscribe('app:changePage', (page) => {
      console.log('changePage', page);
      let activePage = this.pages.findIndex((currPage) => page === currPage.component);
      console.log('activePage', this.activePage);
      if(activePage > -1) {
        this.openPage(this.pages[activePage]);
        console.log('page', this.pages[activePage]);
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.keyboard.hideKeyboardAccessoryBar(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      OpenPay.setSandboxMode(true);
      // OpenPay.setApiKey('sk_f7d7e49cdfa7462cb3ca8af2106481fb')
      OpenPay.setId('mmgdkgnzoy3qpcxf925c');
      OpenPay.setApiKey('pk_20c7b0256fdb4cf8aa87449ddb158abf')
      //OpenPay.setId('mrtezzirtht6piewm54o');
      //OpenPay.setApiKey('pk_c0a63b5356524d2095a0df7172965ed9')
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (!page.component) {
      this.sharedService.logout();
      return;
    }

    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActivePage(page) {
    return page === this.activePage;
  }

  toggleCardItem(ev) {
    this.showCardItem = !this.showCardItem;
    this.pages[2].show = !this.pages[2].show;
    ev.stopPropagation()
  }
  shouldShow(p) {
    let response = true;
    if (this.sharedService.UserData && p.component == 'ValidateSessionPage') {
      response = !!(this.sharedService.UserData.gym_owner);
    }
    return (p.show && response);
  }
}
