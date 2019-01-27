import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {GymService} from "../../services/gym.service";
import {Geolocation} from '@ionic-native/geolocation';
import {AlertService} from "../../services/alert.service";
import {SharedService} from "../../services/shared.service";
import {PaymentService} from "../../services/payment.service";
import {NotificationService} from "../../services/notification.service";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";

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
  NotificationNumber: number;
    uid: any;
    /*settings = {
        aerobico: false,
        crossfit: false,
        ritmos: false,
        pole: false,
        jumping: false,
        spinning: false,
        mma: false,
        karate: false,
        funcional: false,
        pesas: false,
        zumba: false,
        danza: false,
        yoga: false,
        barre: false,
        boxeo: false,
        taekwondo: false,
        natacion: false,
        otras: false,
        location: 0,
        price: 0
    };*/
    preferences = [
        {
            id: 1, value: true
        },
        {
            id: 2, value: true
        },
        {
            id: 3, value: true
        },
        {
            id: 4, value: true
        },
        {
            id: 5, value: true
        },
        {
            id: 6, value: true
        },
        {
            id: 7, value: true
        },
        {
            id: 8, value: true
        },
        {
            id: 9, value: true
        },
        {
            id: 10, value: true
        },
        {
            id: 11, value: true
        },
        {
            id: 12, value: true
        },
        {
            id: 13, value: true
        },
        {
            id: 14, value: true
        },
        {
            id: 15, value: true
        },
        {
            id: 16, value: true
        },
        {
            id: 17, value: true
        },
        {
            id: 18, value: true
        },
        {
            id: 19, value: true
        },
        {
            id: 20, value: true
        }
    ];
    settings = {
        preferences: this.preferences,
        location: 0,
        price: 0
    };
  initialLoader = this.loadingCtrl.create({});

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public userService: UsersService,
              public gymService: GymService,
              public geolocation: Geolocation,
              public modalCtrl: ModalController,
              public alertService: AlertService,
              public sharedService: SharedService,
              public paymentService: PaymentService,
              public notificationService: NotificationService,
              public navParams: NavParams,
              public loadingService: LoadingService,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.getUserLocation();
    //this.showMap(25.727169, -100.32796);
  }

  ionViewWillEnter(){
    this.NotificationNumber = this.notificationService.Notifications.length
  }


  gymPayment(data) {
    this.paymentService.GymPayment(data, this.sharedService.UserData, '20').subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }


  getUserLocation() {
    this.initialLoader.present();
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
    this.geolocation.getCurrentPosition(options).then(position => {
      this.showMap(position.coords.latitude, position.coords.longitude);
      this.userPosition.latitude = position.coords.latitude;
      this.userPosition.longitude = position.coords.longitude;
      this.dataError = false;
      this.initialLoader.dismiss();
    }).catch(error => {
      console.log(error);
      this.alertService.userLocationError();
      this.initialLoader.dismiss();
      this.dataError = true;
    })
  }

  showMap(latitude, longitude) {
    const location = new google.maps.LatLng(latitude, longitude);
    const options = {
      center: location,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      maximumAge: 30000,
      timeout: 30000,
      enableHighAccuracy: true,
      myLocationButton : true,
      myLocation: true,
      compass: true
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
      this.authService.getStatus().subscribe((result) => {
          this.uid = result.uid;
          this.userService.getUserById(this.uid).valueChanges().subscribe((user: any) => {
              this.settings = user.settings || this.settings;
              if(user.settings){
                  this.preferences = user.settings.preferences
              }
              const loader = this.loadingCtrl.create({});
              // this.initialLoader.present();
              this.gymService.getGyms().valueChanges().subscribe((response) => {
                  this.markersArray.forEach((m) => {
                      m.setMap(null)
                  });

                  this.initialLoader.dismiss();
                  this.places = response;
                  let placesTmp: any = [];
                  for(var i=0; i < this.places.length; i++){
                      var sttngs = this.places[i].services;
                      var flag = 0;
                      if(sttngs){
                          if(sttngs.length == 21){
                              var ind = 1;
                              if(this.preferences) {
                                  for (var key in this.preferences) {
                                      if (sttngs[ind] === true && this.preferences[key].value === true) {
                                          flag = 1;
                                      }
                                      ind++;
                                  }
                              }
                          }
                      }

                      if(flag){
                          placesTmp.push(this.places[i]);
                      }
                  }

                  this.setPlacesMarkers(placesTmp);
                  // this.dataError = false;
              }, (error) => {
                  this.initialLoader.dismiss();
                  this.alertService.gymListError();
                  this.dataError = true;
              })
          });
      });

  }

  setPlacesMarkers(places) {
    let map = this.map;
    //Adjusting zoom dependig on the markers
    let bounds = new google.maps.LatLngBounds();

    // Adding item markers
    for (let i = 0; i < places.length; i++) {
      let timeout = i * 100;
      let latLng = new google.maps.LatLng(parseFloat(places[i].lat), parseFloat(places[i].lng));
      if (this.sharedService.UserData) {
        if (!this.sharedService.UserData.Cards || this.sharedService.UserData.Cards.length == 0) {
          // return;
        }
      }
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
          modal.present().then(() => {
            this.NotificationNumber = this.notificationService.Notifications.length;
          });
          modal.onDidDismiss(() => {
            this.NotificationNumber = this.notificationService.Notifications.length;
          })
        });
        //Save marker in array
        this.markersArray.push(marker);
        // //Adjusting zoom dependig on the markers
        // bounds.extend(latLng);
        //map.fitBounds(bounds);
        //map.panToBounds(bounds);
        //map.setCenter(bounds.getCenter());
      }, timeout);
    }
  }


  showPreferences() {
    this.navCtrl.push('PreferencesPage')
  }

  searchGyms() {
    this.searchHasFocus = false;
    console.log(this.places);
    console.log(this.searchQuery);

      if (!this.searchQuery) {
          return null;
      }
      this.searchQuery = this.searchQuery.toLowerCase();
      this.places.filter(function(item){
          return JSON.stringify(item).toLowerCase().includes(this.searchQuery);
      });
      console.log(this.places);
      this.setPlacesMarkers(this.places);
  }

  goTo(page: string) {
    let modal = this.modalCtrl.create(page, {isModal: true});
    modal.present();
  }
}
