import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ValidateSessionPage} from './validate-session';
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        ValidateSessionPage,
    ],
    imports: [
        IonicPageModule.forChild(ValidateSessionPage),
        SharedModule
    ],
})
export class ValidateSessionPageModule {
}
