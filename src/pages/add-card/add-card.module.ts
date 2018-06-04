import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddCardPage} from './add-card';
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        AddCardPage,
    ],
    imports: [
        IonicPageModule.forChild(AddCardPage),
        SharedModule
    ],
})
export class AddCardPageModule {
}
