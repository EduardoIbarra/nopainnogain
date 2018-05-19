import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPage } from './password';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    PasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPage),
    SharedModule
  ],
})
export class PasswordPageModule {}
