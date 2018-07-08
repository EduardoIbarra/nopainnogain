import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GymDetailPage} from './gym-detail';
import {SharedModule} from "../../../app/shared.module";

@NgModule({
    declarations: [
        GymDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(GymDetailPage),
        SharedModule
    ],
})
export class GymDetailPageModule {
}
