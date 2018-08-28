import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from "@ionic-native/keyboard";
import {IonicStorageModule} from "@ionic/storage";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {firebaseConfig} from "./environment";
import {SharedService} from "../services/shared.service";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {GymService} from "../services/gym.service";
import {SharedModule} from "./shared.module";
import {Geolocation} from '@ionic-native/geolocation';
import {AuthService} from "../services/auth.service";
import {Camera} from "@ionic-native/camera";
import {UsersService} from "../services/users.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Facebook} from "@ionic-native/facebook";
import {PaymentService} from "../services/payment.service";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ScanService} from '../services/scan.service';
import {NotificationService} from "../services/notification.service";
import {AddCardPage} from "../pages/add-card/add-card";
import {CardListPage} from "../pages/card-list/card-list";
import {AddCardPageModule} from "../pages/add-card/add-card.module";
import {CardListPageModule} from "../pages/card-list/card-list.module";
import {HomePageModule} from "../pages/home/home.module";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {SocialSharing} from "@ionic-native/social-sharing";
import {HeaderColor} from "@ionic-native/header-color";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: 'Atrás',
          statusbarPadding: true
        }
      },
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AddCardPageModule,
    CardListPageModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddCardPage,
    CardListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: LOCALE_ID, useValue: "es"},
    StatusBar,
    SplashScreen,
    Keyboard,
    SharedService,
    LoadingService,
    AlertService,
    PaymentService,
    GymService,
    Geolocation,
    AuthService,
    Camera,
    UsersService,
    InAppBrowser,
    NotificationService,
    Facebook,
    BarcodeScanner,
    ScanService,
    LaunchNavigator,
    SocialSharing,
    HeaderColor
  ]
})
export class AppModule {
}
