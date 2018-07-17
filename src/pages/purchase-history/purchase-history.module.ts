import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PurchaseHistoryPage} from './purchase-history';
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        PurchaseHistoryPage,
    ],
    imports: [
        IonicPageModule.forChild(PurchaseHistoryPage),
        SharedModule
    ],
})
export class PurchaseHistoryPageModule {
}
