import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReportPage} from './report';
import {SharedModule} from "../../../app/shared.module";

@NgModule({
    declarations: [
        ReportPage,
    ],
    imports: [
        IonicPageModule.forChild(ReportPage),
        SharedModule
    ],
})
export class ReportPageModule {
}
