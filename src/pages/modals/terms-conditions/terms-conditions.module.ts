import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TermsConditionsPage} from './terms-conditions';
import {SharedModule} from "../../../app/shared.module";

@NgModule({
    declarations: [
        TermsConditionsPage,
    ],
    imports: [
        IonicPageModule.forChild(TermsConditionsPage),
        SharedModule
    ],
})
export class TermsConditionsPageModule {
}
