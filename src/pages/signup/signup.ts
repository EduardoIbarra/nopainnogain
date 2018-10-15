import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, Content, IonicPage, NavController, NavParams, Platform, Slides, ToastController, ModalController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {PasswordValidation} from "../../validators/password.validator";
import {LoadingService} from "../../services/loading.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SharedService} from "../../services/shared.service";
import {ImageViewerController} from "ionic-img-viewer";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {AlertService} from "../../services/alert.service";

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    @ViewChild(Slides) slides: Slides;
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
        birthday: {
            value: null,
            text: null
        },
        gender: null,
        state: null,
        city: null,
        postal_code: null,
        profile_picture: null,
        // Second form slide
        card_holder: null,
        card_number: null,
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
                public formBuilder: FormBuilder,) {

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
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            password: ['', Validators.compose([
                Validators.required,
            ])],
            confirmPassword: ['', Validators.compose([
                Validators.required,
            ])],
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
        }, {
            validator: PasswordValidation.MatchPassword
        });

        this.RegisterForm2 = formBuilder.group({
            card_holder: ['', Validators.compose([
                Validators.required,
            ])],
            card_number: ['', Validators.compose([
                Validators.required,
                Validators.minLength(16),
                Validators.maxLength(16),
                Validators.pattern('^[0-9]*$'),
            ])],
            card_expiration: ['', Validators.compose([
                Validators.required,
            ])],
            card_cvv: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
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
        this.slides.lockSwipes(true);
        this.estados = this.sharedService.States;
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
            console.log(this.RegisterForm1);
            if (this.RegisterForm1.valid) {
                this.submitAttemptForm1 = false;
                this.RegisterFormData.birthday.value = moment(this.RegisterFormData.birthday.text).unix();
                console.log(this.RegisterFormData);
                this.formStep = formNumber;
                this.swipeNext();
            } else {
                this.submitAttemptForm1 = true;
            }
        }
        if (formNumber === 2) {
            if (this.RegisterForm2.valid) {
                this.submitAttemptForm2 = false;
                this.content.scrollToTop(1000);
                this.signup();
            } else {
                this.submitAttemptForm2 = true;
            }
        }
    }

    prev() {
        this.slides.lockSwipes(false);
        this.content.scrollToTop(1000);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }

    swipeNext() {
        this.slides.lockSwipes(false);
        this.content.scrollToTop(1000);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
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
            this.alertService.signupError();
        })
    }

    createUser(uid) {
        this.usersService.createUser(this.RegisterFormData, uid).then((response) => {
            console.log(response);
            this.getUserData(uid)
        }, (error) => {
            console.log(error);
            this.loadingService.dismiss();
            this.alertService.signupError();
        })
    }

    getUserData(uid) {
        this.usersService.getUser(uid).then(response => {
            console.log(response.val());
            this.loadingService.dismiss();
            this.sharedService.login(response.val(), this.navCtrl);
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

}
