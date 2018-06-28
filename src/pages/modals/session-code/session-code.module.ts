import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SessionCodePage} from './session-code';
import {SharedModule} from "../../../app/shared.module";

@NgModule({
    declarations: [
        SessionCodePage,
    ],
    imports: [
        IonicPageModule.forChild(SessionCodePage),
        SharedModule
    ],
})
export class SessionCodePageModule {
}
