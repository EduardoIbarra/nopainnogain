import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupPage} from './signup';
import {SharedModule} from "../../app/shared.module";
import {MultiPickerModule} from "ion-multi-picker";

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        SharedModule,
        MultiPickerModule
    ],
})
export class SignupPageModule {
}