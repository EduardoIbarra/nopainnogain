import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {GymService} from "../../services/gym.service";
import {Keyboard} from "@ionic-native/keyboard";
import {Geolocation} from '@ionic-native/geolocation';
import {AlertService} from "../../services/alert.service";

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    @ViewChild('map') mapRef: ElementRef;

    userPosition: any = {latitude: null, longitude: null};

    searchHasFocus: boolean = false;
    dataError: boolean = false;
    searchQuery: string;

    constructor(public navCtrl: NavController,
                public gymService: GymService,
                public geolocation: Geolocation,
                public alertService: AlertService,
                public navParams: NavParams,
                public loadingService: LoadingService,) {

    }

    ionViewDidLoad() {
        this.getUserLocation();
    }


    getUserLocation() {
        this.loadingService.presentLoading();
        let options = {timeout: 10000, enableHighAccuracy: true}
        this.geolocation.getCurrentPosition(options).then(position => {
            this.showMap(position.coords.latitude, position.coords.longitude);
            this.userPosition.latitude = position.coords.latitude;
            this.userPosition.longitude = position.coords.longitude;
            this.dataError = false;
        }).catch(error => {
            console.log(error);
            this.alertService.userLocationError();
            this.loadingService.dismiss();
            this.dataError = true;
        })
    }

    showMap(latitude, longitude) {
        const location = new google.maps.LatLng(latitude, longitude);
        const options = {
            center: location,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
        };
        const map = new google.maps.Map(this.mapRef.nativeElement, options);

        let marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            visible: true
        });

        marker.setMap(map);

        //Set message con marker
        let placeInfo = new google.maps.InfoWindow({content: 'Eres tú'});

        //Events to show message
        google.maps.event.addListener(marker, 'click', () => {
            placeInfo.open(map, marker);
        });

        this.getGymList()
    }

    getGymList() {
        this.gymService.getGyms().valueChanges().subscribe((response) => {
            console.log(response);
            this.loadingService.dismiss();
            this.dataError = false;
        }, (error)=>{
            this.alertService.gymListError();
            this.dataError = true;
        })
    }

    showLoading() {
        this.loadingService.presentLoading();
    }

    searchGyms() {
        this.searchHasFocus = false;
        console.log(this.searchQuery);
    }
}
