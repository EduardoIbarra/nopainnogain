import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SharedService} from "../../../services/shared.service";

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-gym-detail',
    templateUrl: 'gym-detail.html',
})
export class GymDetailPage {

    segment: string = 'info';
    gym: any;
    isOpenToday: boolean = false;
    firstOpen: boolean = true;


    @ViewChild('gymMap') mapRef: ElementRef;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public sharedService: SharedService,
                public navParams: NavParams) {

        this.gym = navParams.get('data');
    }

    ionViewDidLoad() {
        console.log(this.gym);
        this.loadMap();

        let today = new Date().getDay();
        if (today === 0 && this.gym.open_sunday) this.isOpenToday = true;
        if (today === 1 && this.gym.open_monday) this.isOpenToday = true;
        if (today === 2 && this.gym.open_tuesday) this.isOpenToday = true;
        if (today === 3 && this.gym.open_wednesday) this.isOpenToday = true;
        if (today === 4 && this.gym.open_thursday) this.isOpenToday = true;
        if (today === 5 && this.gym.open_friday) this.isOpenToday = true;
        if (today === 6 && this.gym.open_saturday) this.isOpenToday = true;
    }

    loadMap() {
        const location = new google.maps.LatLng(parseFloat(this.gym.lat), parseFloat(this.gym.lng));
        const options = {
            center: location,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            maximumAge: 30000,
            timeout: 30000,
            enableHighAccuracy: false
        };
        const map = new google.maps.Map(this.mapRef.nativeElement, options);

        google.maps.event.addListener(map, 'tilt_changed', () => {
            let marker = new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.DROP,
                visible: true,
                icon: {
                    url: 'assets/img/gym-marker.png',
                    scaledSize: new google.maps.Size(25, 50)
                },
            });
            marker.setMap(map);
        });

        this.segment = 'info';
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    activeSegment(segment) {
        this.segment = segment;
        this.firstOpen = false;
        if (segment === 'info') {
            setTimeout(() => {
                this.loadMap()
            }, 200)
        }
    }

}
