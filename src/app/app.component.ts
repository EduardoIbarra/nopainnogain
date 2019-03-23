import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events, App, NavController, ToastController, ViewController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from "@ionic-native/keyboard";
import {Storage} from "@ionic/storage";
import {SharedService} from "../services/shared.service";
import {NotificationService} from "../services/notification.service";
import {AddCardPage} from "../pages/add-card/add-card";
import {CardListPage} from "../pages/card-list/card-list";
import {AuthService} from "../services/auth.service";
import {UsersService} from "../services/users.service";
import {HeaderColor} from "@ionic-native/header-color";

declare var OpenPay: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;
  showCardItem: boolean = false;
  notNumber: number;


  pages: Array<{ title: string, component: any, icon: string, show: boolean }>;
  cardExcludedPages = ['AddCardPage', 'CardListPage', 'LoadingCmp', 'LoginPage', 'AlertCmp', 'PopoverCmp', 'ModalCmp'];
  user: any;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sharedService: SharedService,
              public notificationService: NotificationService,
              public storage: Storage,
              public keyboard: Keyboard,
              public events: Events,
              public app: App,
              public toastCtrl: ToastController,
              public authService: AuthService,
              public userService: UsersService,
              private headerColor: HeaderColor) {
    this.initializeApp();

    this.storage.get('UserData').then((UserData) => {
      this.sharedService.UserData = UserData;
      console.log(UserData);
      if(UserData){
        if(this.sharedService.UserData.gym_owner && UserData){
          this.rootPage = 'ValidateSessionPage';
        } else {
          this.rootPage = 'HomePage';
        }
      }else{
        this.rootPage = UserData ? 'HomePage' : 'LoginPage';
      }
      this.sharedService.enableSplitPane = this.rootPage !== 'LoginPage';
    });

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Inicio', component: 'HomePage', icon: 'pin.png', show: true},
      {title: 'Datos Personales', component: 'ProfilePage', icon: 'user.png', show: true},
      {title: 'Datos de tarjeta', component: 'CardListPage', icon: 'card.png', show: true},
      {title: 'Notificaciones', component: 'NotificationsPage', icon: 'notification.png', show: true},
      {title: 'Historial de Compras', component: 'PurchaseHistoryPage', icon: 'history.png', show: true},
      {title: 'Preferencias', component: 'PreferencesPage', icon: 'preferences.png', show: true},
      {title: 'Promociones', component: 'PromotionsPage', icon: 'promos.png', show: true},
      {title: 'Ayuda', component: 'HelpPage', icon: 'help.png', show: true},
      {title: 'Validar Sesión', component: 'ValidateSessionPage', icon: 'qr-code.png', show: true},
      // {title: 'Aviso de Privacidad', component: 'PrivacyPage', icon: 'user.png', show: true},
      // {title: 'Términos y Condiciones', component: 'TermsConditionsPage', icon: 'user.png', show: true},
      {title: 'Cerrar Sesión', component: null, icon: 'logout.png', show: true}
    ];

    this.activePage = this.pages[0];

    this.events.subscribe('app:changePage', (page) => {
      console.log('changePage', page);
      let activePage = this.pages.findIndex((currPage) => page === currPage.component);
      console.log('activePage', this.activePage);
      if (activePage > -1) {
        this.openPage(this.pages[activePage]);
        console.log('page', this.pages[activePage]);
      }
    });

    this.authService.getStatus().subscribe((data) => {
      if (!data) {
        return;
      }

      this.userService.getUserById(data.uid).valueChanges().subscribe((data) => {
        this.user = data;
        if(this.user.cards) {
          this.user.cards = Object.keys(this.user.cards).map(key => this.user.cards[key]);
        }
        app.viewWillEnter.subscribe((event) => {
            if (this.user) {
              if ((!this.user.cards || this.user.cards.length == 0) && !this.cardExcludedPages.includes(event.component.name)) {
                console.log(event.component.name);
                this.app.getActiveNavs()[0].setRoot(CardListPage).then((data) => {
                  let toast = this.toastCtrl.create({
                    message: 'Antes de continuar, debe agregar por lo menos una tarjeta',
                    duration: 1500,
                    position: 'bottom',
                    showCloseButton: true,
                    closeButtonText: 'Ok'
                  });
                  //toast.present();
                  alert('Antes de continuar, debe agregar por lo menos una tarjeta');
                }).catch((error) => {
                  console.log(error);
                });
              }
            }
          }
        )
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // this.keyboard.hideKeyboardAccessoryBar(false);
      // this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#1f4487');
      this.headerColor.tint('#1f4487');
      this.splashScreen.hide();


      OpenPay.setSandboxMode(true);
      // OpenPay.setApiKey('sk_f7d7e49cdfa7462cb3ca8af2106481fb')
      OpenPay.setId('mvvcgnysitepddh4a5cs');
      OpenPay.setApiKey('pk_b9d64e3391974d35a5314d0beea06f5b')
      //OpenPay.setId('mrtezzirtht6piewm54o');
      //OpenPay.setApiKey('pk_c0a63b5356524d2095a0df7172965ed9')
      this.notificationService.getHistoryToNotifications()
      this.setNotificationsBadge()
    });

    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      let activeView: ViewController = nav.getActive();

      if(activeView != null){
        if (typeof activeView.instance.backButtonAction === 'function') {
          activeView.instance.backButtonAction();
        } else {
          if(nav.canGoBack()) {
            nav.pop();
          }
        }
      }
    });
  }

  setNotificationsBadge(){
    setInterval(()=>{
      this.notNumber = this.notificationService.Notifications.length
    }, 1000)
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
      response = this.sharedService.UserData.gym_owner;
    }
    if (this.sharedService.UserData && this.sharedService.UserData.gym_owner && p.component != 'ValidateSessionPage' && p.title != 'Cerrar Sesión') {
      response = false;
    }
    return (p.show && response) ? true : false;
    //return true;
  }
}
