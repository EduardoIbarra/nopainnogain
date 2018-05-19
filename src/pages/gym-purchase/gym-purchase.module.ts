import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GymPurchasePage} from './gym-purchase';
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        GymPurchasePage,
    ],
    imports: [
        IonicPageModule.forChild(GymPurchasePage),
        SharedModule
    ],
})
export class GymPurchasePageModule {
}
