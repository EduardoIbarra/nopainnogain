import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, Content, IonicPage, NavController, NavParams, Platform, Slides, ToastController, ModalController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {PasswordValidation} from "../../validators/password.validator";
import {LoadingService} from "../../services/loading.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SharedService} from "../../services/shared.service";
import {ImageViewerController} from "ionic-img-viewer";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {AlertService} from "../../services/alert.service";
import {Storage} from "@ionic/storage";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
declare var OpenPay: any;

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild(Content) content: Content;
  @ViewChild('ccImage') ccImage;

  RegisterForm1: FormGroup;
  RegisterForm2: FormGroup;
  _imageViewerCtrl: ImageViewerController;


  submitAttemptForm1: boolean = false;
  submitAttemptForm2: boolean = false;
  accepted_terms: boolean = false;

  RegisterFormData: any = {
    //First form slide
    name: null,
    last_name: null,
    email: null,
    password: null,
    confirmPassword: null,
    phone: null,
    birthday: null,
    gender: null,
    // address: null,
    state: null,
    city: null,
    postal_code: null,
    profile_picture: null,
    // Second form slide
    card_holder: null,
    card_number: null,
    address: null,
    card_expiration: null,
    card_cvv: null,
    fb_id: null,
    fb_token: null
  };

  ccOptions: any = [];
  cameraOptions: CameraOptions;

  estados: any = [];
  municipios: any = [];

  viewPass: boolean = false;
  passType: string = 'password';
  viewCPass: boolean = false;
  cpassType: string = 'password';
  CardData: any;
  user: any;
  user2: any;
  emailTaken: boolean = true;
  changeViewPass() {
    this.viewPass = !this.viewPass;
    if(this.viewPass) {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }
  changeViewCPass() {
    this.viewCPass = !this.viewCPass;
    if(this.viewCPass) {
      this.cpassType = 'text';
    } else {
      this.cpassType = 'password';
    }
  }
  verificationSent = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public loadingService: LoadingService,
              public sharedService: SharedService,
              public usersService: UsersService,
              public alertService: AlertService,
              public authService: AuthService,
              public imageViewerCtrl: ImageViewerController,
              public platform: Platform,
              public camera: Camera,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public formBuilder: FormBuilder,
              public storage: Storage,
              private firebaseAuth: AngularFireAuth) {

    this._imageViewerCtrl = imageViewerCtrl;

    this.getExpirationDate();

    //Form validations
    this.RegisterForm1 = formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ])],
      gender: ['', Validators.compose([
        Validators.required
      ])],
      birthday: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        this.validateEmailNotTaken.bind(this)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      /*address: ['', Validators.compose([
          Validators.required
      ])],*/
      state: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      postal_code: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])],
      card_holder: ['', Validators.compose([
        Validators.required,
      ])],
      address: ['', Validators.compose([
        Validators.required,
      ])],
      card_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$'),
      ])],
      card_expiration: ['', Validators.compose([
        Validators.required,
      ])],
      card_cvv: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
      ])]
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.RegisterForm2 = formBuilder.group({
      card_holder: ['', Validators.compose([
        Validators.required,
      ])],
      address: ['', Validators.compose([
        Validators.required,
      ])],
      card_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$'),
      ])],
      card_expiration: ['', Validators.compose([
        Validators.required,
      ])],
      card_cvv: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$'),
      ])]
    });

    this.RegisterForm1.controls['city'].disable();

    this.cameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: camera.MediaType.PICTURE
    };

  }

  ionViewDidLoad() {
    this.estados = this.sharedService.States;
    this.getUserByEmail('eduardo@gobae.coma');
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.usersService.getByEmail(control.value).on("value", (response) => {
      this.emailTaken = !!response.val();
    });
  }

  getUserByEmail(email) {
    this.usersService.getByEmail(email).on("value", (response) => {
      console.log(response.val());
    });
  }

  getExpirationDate() {
    let currentYear = new Date();
    let yearOpts: any = [];
    for (let i = 0; i < 11; i++) {
      yearOpts.push({
        text: moment(currentYear).add(i, 'years').format("YYYY"),
        value: moment(currentYear).add(i, 'years').format("YYYY")
      })
    }
    this.ccOptions = [
      {
        options: [
          {text: '01', value: '01'},
          {text: '02', value: '02'},
          {text: '03', value: '03'},
          {text: '04', value: '04'},
          {text: '05', value: '05'},
          {text: '06', value: '06'},
          {text: '07', value: '07'},
          {text: '08', value: '08'},
          {text: '09', value: '09'},
          {text: '10', value: '10'},
          {text: '11', value: '11'},
          {text: '12', value: '12'},
        ]
      },
      {
        options: yearOpts
      }
    ];
  }

  formStep = 0;
  next(formNumber) {
    if (formNumber === 1) {
      if(this.emailTaken && this.RegisterFormData.email) {
        alert('El email ingresado ya existe en la base de datos, por favor ingrese otro.');
        return;
      }
      console.log(this.RegisterForm1);
      if (this.RegisterForm1.valid) {
        this.submitAttemptForm1 = false;
        //this.RegisterFormData.birthday.value = moment(this.RegisterFormData.birthday.text).unix();
        console.log(this.RegisterFormData);
        this.formStep = formNumber;
      } else {
        this.submitAttemptForm1 = true;
      }
    }
    if (formNumber === 2) {
      this.submitAttemptForm2 = false;
      this.content.scrollToTop(1000);
      this.signup();
      /*if (this.RegisterForm2.valid) {
        this.submitAttemptForm2 = false;
        this.content.scrollToTop(1000);
        this.signup();
      } else {
        this.submitAttemptForm2 = true;
      }*/
    }
  }

  backButtonAction(){
    this.formStep = 0;
  }

  openImageOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar imagen desde',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Galería',
          handler: () => {
            this.openGallery();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel-button'
        }
      ]
    });
    actionSheet.present();
  }

  removeImage() {
    this.RegisterFormData.profile_picture = null;

    let toast = this.toastCtrl.create({
      message: 'Imagen eliminada',
      duration: 1500,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  takePicture() {
    this.loadingService.presentLoading();
    this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.cameraOptions)
      .then(imageData => {
        this.RegisterFormData.profile_picture = `data:image/jpeg;base64,${imageData}`;
        this.loadingService.dismiss();
        setTimeout(() => {
          this.content.scrollToBottom(1000);
        }, 500);
        console.log(this.RegisterFormData);
      }, (err) => {
        this.loadingService.dismiss();
        console.log(JSON.stringify(err));
      });
  }

  openGallery() {
    this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.loadingService.presentLoading();
    this.camera.getPicture(this.cameraOptions)
      .then(imageData => {
        if (this.platform.is('ios')) {
          imageData = imageData.replace(/^file:\/\//, '');
        }
        this.RegisterFormData.profile_picture = `data:image/jpeg;base64,${imageData}`;
        this.loadingService.dismiss();
        setTimeout(() => {
          this.content.scrollToBottom(1000);
        }, 500);
        console.log(this.RegisterFormData);
      }, (err) => {
        this.loadingService.dismiss();
        console.log(JSON.stringify(err));
      });
  }

  selectState() {
    const state = this.RegisterFormData.state;
    console.log(this.RegisterFormData.state);
    this.RegisterFormData.state = state;
    this.RegisterFormData.city = null;
    this.estados.filter((s) => {
      if (s.nombre === state) {
        this.municipios = s.estados;
        return;
      }
    });

    this.RegisterForm1.controls['city'].enable();

  }

  showCreditCardExample() {
    const imageViewer = this._imageViewerCtrl.create(this.ccImage.nativeElement);
    imageViewer.present();
  }

  signup() {
    this.loadingService.presentLoading();
    console.log(this.RegisterFormData);
    this.authService.signup(this.RegisterFormData.email, this.RegisterFormData.password).then((response) => {
      console.log(response);
      this.createUser(response.uid);
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
      this.alertService.signupError(error);
    })
  }

  createUser(uid) {
    this.usersService.createUser(this.RegisterFormData, uid).then((response) => {
      this.user2 = response;
      this.getUserData(uid)
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
      this.alertService.signupError();
    })
  }

  addCard() {
    OpenPay.token.create({
        "card_number": this.user.card_number,
        "holder_name": this.user.card_holder,
        "expiration_year": this.user.card_expiration.split('/')[1].slice(-2),
        "expiration_month": this.user.card_expiration.split('/')[0],
        "cvv2": this.user.card_cvv
      },
      (data) => {
        console.log(data);
        data.data.card.card_number_plain = this.user.card_number;
        data.data.card.address = this.user.address;
        this.usersService.registerCard(this.user, data.data);

        this.sendVerificationEmail();
        //this.sharedService.login(this.user, this.navCtrl);
      }, (error) => {
        console.log(error);
        alert('La tarjeta no se agregó correctamente, deberá agregarla desde el menú de tarjetas: ' + error.data.description);
        this.alertService.createAlertError();
        this.sharedService.login(this.user, this.navCtrl);
      });
  }

  getUserData(uid) {
    this.usersService.getUser(uid).then(response => {
      this.user = response.val();
      this.user.uid = uid;
      this.addCard();
      console.log(response.val());
      this.loadingService.dismiss();
    }).catch((error) => {
      console.log(error);
      console.log('Something went wrong:', error.message);
      this.loadingService.dismiss();
    });
  }

  goTo(page: string) {
    console.log(page);
    let modal = this.modalCtrl.create(page, {isModal: true});
    modal.present();
  }

  checkForVerification() {
     this.authService.reloadUser().then((data) => {
       const emailVerified = this.firebaseAuth.auth.currentUser.emailVerified;
       if (emailVerified) {
         this.sharedService.login(this.user, this.navCtrl);
       } else {
         alert('Su email aun no ha sido verificado');
       }
    }).catch((error) => {
      console.log(error);
    });
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  sendVerificationEmail() {
    this.authService.sendVerificationEmail().then((data) => {
      this.verificationSent = true;
      alert('Hemos enviado un email de verificación para que puedas ingresar a tu cuenta');
    }).catch((error) => {
      console.log(error);
    });
  }
}
