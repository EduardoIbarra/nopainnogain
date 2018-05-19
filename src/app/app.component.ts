import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from "@ionic-native/keyboard";
import {Storage} from "@ionic/storage";
import {SharedService} from "../services/shared.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    activePage: any;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public sharedService: SharedService,
                public storage: Storage,
                public keyboard: Keyboard,) {
        this.initializeApp();


        this.storage.get('UserData').then((UserData) => {
            console.log('UserData: ', UserData);
            this.sharedService.UserData = UserData;
            this.rootPage = UserData ? 'HomePage' : 'LoginPage';
            this.sharedService.enableSplitPane = this.rootPage !== 'LoginPage';
        });

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Cercanos', component: 'HomePage', icon: 'pin.png'},
            {title: 'Datos Personales', component: 'HomePage', icon: 'user.png'},
            {title: 'Notificaciones', component: 'HomePage', icon: 'notification.png'},
            {title: 'Historial de Compras', component: 'PurchaseHistoryPage', icon: 'history.png'},
            {title: 'Preferencias', component: 'HomePage', icon: 'preferences.png'},
            {title: 'Promociones', component: 'HomePage', icon: 'promos.png'},
            {title: 'Ayuda', component: 'HomePage', icon: 'help.png'},
            {title: 'Cerrar Sesión', component: null, icon: 'logout.png'},
        ];

        this.activePage = this.pages[0];

    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            this.keyboard.hideKeyboardAccessoryBar(false);
            this.statusBar.styleDefault();
            this.splashScreen.hide();
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
}
