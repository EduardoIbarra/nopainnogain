import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HowToPromotionsPage} from './how-to-promotions';
import {SharedModule} from "../../../app/shared.module";

@NgModule({
    declarations: [
        HowToPromotionsPage,
    ],
    imports: [
        IonicPageModule.forChild(HowToPromotionsPage),
        SharedModule
    ],
})
export class HowToPromotionsPageModule {
}
