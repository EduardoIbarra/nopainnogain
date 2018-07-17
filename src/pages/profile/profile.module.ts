import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilePage} from './profile';
import {SharedModule} from "../../app/shared.module";
import {MultiPickerModule} from "ion-multi-picker";

@NgModule({
    declarations: [
        ProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        SharedModule,
        MultiPickerModule
    ],
})
export class ProfilePageModule {
}
