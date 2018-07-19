import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, Content, IonicPage, NavController, NavParams, Platform, Slides, ToastController} from 'ionic-angular';
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
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;
    @ViewChild('ccImage') ccImage;

    currentUser: any;
    RegisterForm1: FormGroup;
    _imageViewerCtrl: ImageViewerController;

    RegisterFormData: any = {
        uid: null,
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
        fb_id: null,
        fb_token: null
    };

    cameraOptions: CameraOptions;

    estados: any = [];
    municipios: any = [];

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
                public formBuilder: FormBuilder,) {

        this.authService.getStatus().subscribe((result) => {
            if(result) {
                console.log(result);
                this.getUserData(result.uid);
            } else {
                console.log('Usuario no encontrado')
            }
        });
        this._imageViewerCtrl = imageViewerCtrl;

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

    ionViewDidLoad() {
        this.estados = this.sharedService.States;
        console.log(this.estados);
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

    selectState(state) {
        console.log(state);
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

    updateUser(uid) {
        if(this.currentUser === null) return;
        let auxUser: any = this.currentUser;
        auxUser.uid = this.RegisterFormData.uid;
        auxUser.name = this.RegisterFormData.name;
        auxUser.last_name = this.RegisterFormData.last_name;
        auxUser.email = this.RegisterFormData.email;
        auxUser.phone = this.RegisterFormData.phone;
        auxUser.birthday = this.RegisterFormData.birthday
        auxUser.gender = this.RegisterFormData.gender;
        auxUser.state = this.RegisterFormData.state;
        auxUser.city = this.RegisterFormData.city;
        auxUser.postal_code = this.RegisterFormData.postal_code;

        if(this.RegisterFormData.password != '' && this.RegisterFormData.password === this.RegisterFormData.confirmPassword) {
            auxUser.password = this.RegisterFormData.password;
        } else if(this.RegisterFormData.password != '') {
            let toast = this.toastCtrl.create({
                message: 'Las contraseñas no coinciden',
                duration: 1500,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        }

        if(typeof this.RegisterFormData.profile_picture != 'undefined' && this.RegisterFormData.profile_picture != '' ) {
            auxUser.profile_picture = this.RegisterFormData.profile_picture;
        }
        // auxUser.profile_picture = this.currentUser.profile_picture;
        this.loadingService.presentLoading();
        this.usersService.editUser(auxUser).then((response) => {
            console.log(response);
            // this.getUserData(uid);
            let toast = this.toastCtrl.create({
                message: 'Usuario Actualizado',
                duration: 1500,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            this.RegisterFormData.password = '';
            this.RegisterFormData.confirmPassword = '';
            toast.present();
            this.loadingService.dismiss();
        }, (error) => {
            console.log(error);
            this.loadingService.dismiss();
            this.alertService.signupError();
        })
    }

    getUserData(uid) {
        this.loadingService.presentLoading();
        this.usersService.getUser(uid).then(response => {
            console.log(response.val());
            this.currentUser = response.val();
            this.RegisterFormData.uid = uid;
            this.RegisterFormData.name = this.currentUser.name;
            this.RegisterFormData.last_name = this.currentUser.last_name;
            this.RegisterFormData.email = this.currentUser.email;
            this.RegisterFormData.phone = this.currentUser.phone;
            this.RegisterFormData.birthday = this.currentUser.birthday
            this.RegisterFormData.gender = this.currentUser.gender;
            this.RegisterFormData.state = this.currentUser.state;
            this.RegisterFormData.city = this.currentUser.city;
            this.RegisterFormData.postal_code = this.currentUser.postal_code;
            this.RegisterFormData.profile_picture = this.currentUser.profile_picture;
            this.loadingService.dismiss();
            this.selectState(this.currentUser.state);
            this.RegisterFormData.city = this.currentUser.city;
        }).catch((error) => {
            console.log(error);
            console.log('Something went wrong:', error.message);
            this.loadingService.dismiss();
        });
    }
}
