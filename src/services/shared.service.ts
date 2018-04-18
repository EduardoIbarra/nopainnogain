import {Injectable} from '@angular/core';
import {AlertController, App, MenuController} from "ionic-angular";
import {Storage} from "@ionic/storage";

@Injectable()

export class SharedService {

    LoggedUser: any;
    activePage: any;
    enableSplitPane: boolean;


    constructor(public alertCtrl: AlertController,
                public menu: MenuController,
                public app: App,
                public storage: Storage,) {
    }

    linkify(inputText) {
        let regex = new RegExp(
            "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
            "g"
        );
        let output = inputText.replace(regex, function (m) {
            let match = m.replace(/ /g, '');
            return '<a href="tel:' + match + '">' + m + '</a>';
        });
        return output;
    };


    logout() {
        this.LoggedUser = null;
        this.enableSplitPane = false;
        this.storage.set('LoggedUser', null);
        this.menu.enable(true, 'PublicUserMenu');
        this.menu.enable(false, 'LoggedUserMenu');
        let nav: any = this.app.getRootNavById('n4');
        nav.setRoot('HomePage');
    }

    SetLoggedUser(UserData) {
        this.LoggedUser = {
            Email: UserData.email,
            Name: 'Miguel Hernández'
        };

        this.enableSplitPane = true;

        this.storage.set('LoggedUser', this.LoggedUser);
        this.activePage = 'HomePage';
        this.menu.enable(false, 'PublicUserMenu');
        this.menu.enable(true, 'LoggedUserMenu');
        let nav: any = this.app.getRootNavById('n4');
        nav.setRoot('HomePage');
    }

    //Higlight tab on sidemenu
    checkActive(page) {
        return page.component == this.activePage
    }

    setPageRoot(page) {
        let nav: any = this.app.getRootNavById('n4');
        nav.setRoot(page);
    }
}