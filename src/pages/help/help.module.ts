import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HelpPage} from './help';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    HelpPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpPage),
    SharedModule
  ],
})
export class HelpPageModule {
}
