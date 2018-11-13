import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CardListPage} from './card-list';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    CardListPage,
  ],
  imports: [
    IonicPageModule.forChild(CardListPage),
    SharedModule
  ],
})
export class CardListPageModule {
}
