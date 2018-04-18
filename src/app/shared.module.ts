import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {AccordionListComponent} from "../components/accordion-list/accordion-list";
import {SideMenuContentComponent} from "../components/side-menu-content/side-menu-content.component";
import {NavbarBumpComponent} from "../components/navbar-bump/navbar-bump";
import {LiberiButtonComponent} from "../components/liberi-button/liberi-button";

@NgModule({
    declarations: [
        AccordionListComponent,
        SideMenuContentComponent,
        NavbarBumpComponent,
        LiberiButtonComponent
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        AccordionListComponent,
        SideMenuContentComponent,
        NavbarBumpComponent,
        LiberiButtonComponent
    ]
})

export class SharedModule {
}
