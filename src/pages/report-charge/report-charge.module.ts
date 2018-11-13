import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReportChargePage} from './report-charge';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    ReportChargePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportChargePage),
    SharedModule
  ],
})
export class ReportChargePageModule {
}
