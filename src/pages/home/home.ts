import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {GymService} from "../../services/gym.service";
import {Geolocation} from '@ionic-native/geolocation';
import {AlertService} from "../../services/alert.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";

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
  map: any;
  places: any = [];
  markersArray: any = [];

  constructor(public navCtrl: NavController,
              public gymService: GymService,
              public geolocation: Geolocation,
              public modalCtrl: ModalController,
              public alertService: AlertService,
              public sharedService: SharedService,
              public paymentService: PaymentService,
              public navParams: NavParams,
              public loadingService: LoadingService) {
  }

  ionViewDidLoad() {
    this.getUserLocation();
    //this.showMap(25.727169, -100.32796);
  }

  gymPayment(data) {
    this.paymentService.GymPayment(data, this.sharedService.UserData, '20').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }


  getUserLocation() {
    this.loadingService.presentLoading();
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
    this.geolocation.getCurrentPosition(options).then(position => {
      this.showMap(position.coords.latitude, position.coords.longitude);
      this.userPosition.latitude = position.coords.latitude;
      this.userPosition.longitude = position.coords.longitude;
      this.dataError = false;
      this.loadingService.dismiss();
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
      maximumAge: 30000,
      timeout: 30000,
      enableHighAccuracy: false
    };
    const map = new google.maps.Map(this.mapRef.nativeElement, options);

    google.maps.event.addListener(map, 'tilt_changed', () => {
      let marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        visible: true
      });

      marker.setMap(map);

      //Set message con marker
      let placeInfo = new google.maps.InfoWindow({content: 'Estás aquí'});

      //Events to show message
      google.maps.event.addListener(marker, 'click', () => {
        placeInfo.open(map, marker);
      });

      this.map = map;

      this.getGymList()
    });
  }

  getGymList() {
    this.loadingService.presentLoading();
    this.gymService.getGyms().valueChanges().subscribe((response) => {
      this.markersArray.forEach((m) => {
        m.setMap(null)
      });

      console.log(response);
      this.loadingService.dismiss();
      this.places = response;
      this.setPlacesMarkers(this.places);
      // this.dataError = false;
    }, (error) => {
      this.loadingService.dismiss();
      this.alertService.gymListError();
      this.dataError = true;
    })
  }

  setPlacesMarkers(places) {
    let map = this.map;
    console.log(places);

    //Adjusting zoom dependig on the markers
    let bounds = new google.maps.LatLngBounds();

    // Adding item markers
    for (let i = 0; i < places.length; i++) {
      let timeout = i * 300;
      let latLng = new google.maps.LatLng(parseFloat(places[i].lat), parseFloat(places[i].lng));

      //Drop marker one by one
      setTimeout(() => {
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'assets/img/gym-marker.png',
            scaledSize: new google.maps.Size(25, 50)
          },
          visible: true
        });


        //Show name when click on marker icon
        google.maps.event.addListener(marker, 'click', () => {
          // infoWindow.open(map, marker);
          let modal = this.modalCtrl.create('GymDetailPage', {data: places[i]});
          modal.present();
        });
        //Save marker in array
        this.markersArray.push(marker);
        // //Adjusting zoom dependig on the markers
        bounds.extend(latLng);
        map.fitBounds(bounds);
        map.panToBounds(bounds);
        map.setCenter(bounds.getCenter());
      }, timeout);
    }
  }


  showPreferences() {
    this.navCtrl.push('PreferencesPage')
  }

  searchGyms() {
    this.searchHasFocus = false;
    console.log(this.searchQuery);
  }

  goTo(page: string) {
    let modal = this.modalCtrl.create(page, {isModal: true});
    modal.present();
  }
}
