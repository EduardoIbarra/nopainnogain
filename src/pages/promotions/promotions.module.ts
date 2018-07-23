import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PromotionsPage} from './promotions';
import {SharedModule} from '../../app/shared.module';

@NgModule({
  declarations: [
    PromotionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionsPage),
    SharedModule
  ],
})
export class PromotionsPageModule {
}
