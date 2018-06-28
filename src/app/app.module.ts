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
import {Http, HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@NgModule({
    declarations: [
        MyApp,
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
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
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
        Facebook,
        BarcodeScanner
    ]
})
export class AppModule {
}
