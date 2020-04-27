import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/usuario/login.service';
import { CentroService } from '../services/centro/centro.service';

declare function iniciar_plugins();
declare const  gapi: any;


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
    h2 {
        float:center;
        margin-top: 20px;
        color: #fff;
        margin-bottom: 0px;
        font-size: 35px;
        font-weight: 700;
        letter-spacing: normal;
    }
    .swal-button {
        background-color: #b3c211;
        border: 1px solid #b3c211;
    }
    .mensaje-validacion-form{
        margin-top: -25px;
    }
    .mensaje-validacion-form small{
        font-size: 11px;
    }
    .btn-google{
        background-color: #dc4e41;
    }
    .btn-google:hover{
        background-color: #bb2416;
    }

    h5 {
        font-size:15px;
        margin-bottom:15px;
    },
    #radioBtn .notActive{
    color: #3276b1;
    background-color: #fff;
    },


`]
})
export class RegisterComponent implements OnInit {

    forma: FormGroup;
    forma2: FormGroup;
    cargando = false;
    auth2: any;


    constructor(
        public router: Router,
        public _loginService: LoginService,
        public _centroService: CentroService
    ) { }

    sonIguales(campo1: string, campo2: string) {

        return (group: FormGroup) => {

            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if ( pass1 === pass2) {
                return null;
            }
            return {
                sonIguales: true,
            };
        };
    }

    ngOnInit() {
        iniciar_plugins();
        this.googleInit();
        this.googleInitCentro();

        this.forma = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,

                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
            ], this.validateEmailNotTaken.bind(this) ),
            password: new FormControl(null, [Validators.required,  Validators.minLength(6), Validators.maxLength(30)]),
            password2: new FormControl(null, Validators.required),
            condiciones: new FormControl(false)
        }, { validators: [ this.sonIguales('password', 'password2')]}
        );

        this.forma2 = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,

                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
            ], this.validateEmailNotTakenCentro.bind(this) ),
            password: new FormControl(null, [Validators.required,  Validators.minLength(6), Validators.maxLength(30)]),
            password2: new FormControl(null, Validators.required),
            condiciones: new FormControl(false)
        }, { validators: [ this.sonIguales('password', 'password2')]}
        );
    }

    registrarUsuario() {



        const Toast = Swal.mixin({
            confirmButtonColor: '#b3c211',
        });
        if (this.forma.invalid) {
            Toast.fire('Error', 'Corrija los errores del formulario', 'error');
            return;
        }

        if (!this.forma.value.condiciones) {
            Toast.fire('Importante', 'Debe acepta las condiciones', 'warning');
            return;
        }

        const usuario = new Usuario(
            this.forma.value.email,
            this.forma.value.password,
            false,
        );
        this.cargando = true;
        this._loginService.crearUsuario(usuario)
            .subscribe( resp => {
                this.router.navigate(['/login']);
                this.cargando = false;
            }, (err) => this.cargando = false );
    }

    registrarCentro() {

    }


    validateEmailNotTaken(control: AbstractControl) {
        return this._loginService.checkEmailNotTaken(control.value)
            .pipe(
                map(res => {
                    return res ? null : { emailTaken: true };
                  })
            );
    }

    validateEmailNotTakenCentro(control: AbstractControl) {
        return this._centroService.checkEmailNotTaken(control.value)
            .pipe(
                map(res => {
                    return res ? null : { emailTaken: true };
                  })
            );
    }


    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                clientId: '1023152870500-glc3619p64kein5ep5igdvtfhs7jngkd.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.attachSignin(document.getElementById('btnGoogle') );

        });
    }

    googleInitCentro() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                clientId: '1023152870500-glc3619p64kein5ep5igdvtfhs7jngkd.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.attachSigninCentro(document.getElementById('btnGoogle2') );

        });
    }

    attachSignin(element) {
        this.auth2.attachClickHandler(element, {}, (googleUser) => {
            // const profile = googleUser.getBasicProfile();

            const token = googleUser.getAuthResponse().id_token;

            this._loginService.loginGoogle(token)
                .subscribe( () => {
                    Swal.fire('Usuario registrado como adoptante! ', 'success');
                    this.router.navigate(['/dashboard']);
                    // Correción sugerida porque no cargaba bien el diseño del template:
                    // window.location.href = '#/dashboard';
                });
        });

    }

    attachSigninCentro(element) {
        this.auth2.attachClickHandler(element, {}, (googleUser) => {
            // const profile = googleUser.getBasicProfile();

            const token = googleUser.getAuthResponse().id_token;

            this._centroService.loginGoogle(token)
                .subscribe( () => {
                    Swal.fire('Usuario registrado como centro de adopción! ', 'Inicie Sesión', 'success');
                    this.router.navigate(['/dashboard']);
                    // Correción sugerida porque no cargaba bien el diseño del template:
                    // window.location.href = '#/dashboard';
                });
        });

    }


    // cambiar todo a un tipo de usuario


}
