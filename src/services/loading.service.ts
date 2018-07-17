import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

@Injectable()

export class LoadingService {
    private loading: any;
    // private contentImageLogo: string = '<img class="loading-image" src="assets/img/logo-negative.png">';
    // contentImageLogo: string = '<img class="loading-rotating-image loading-rotating-image-background" src="assets/img/logo.png">';

    constructor(private loadingCtrl: LoadingController) {
    }

    presentLoading() {
        this.loading = this.loadingCtrl.create({
            // spinner: 'hide',
            // cssClass: 'no-spinner-background',
            // content: this.contentImageLogo
        });

        this.loading.present();
    }

    dismiss() {
        this.loading.dismiss();
    }

}
