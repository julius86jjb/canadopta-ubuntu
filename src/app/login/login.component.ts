import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/usuario/login.service';
import Swal from 'sweetalert2';

declare function iniciar_plugins();
declare const  gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    recuerdame = false;
    email: string;
    auth2: any;

    constructor(
        public router: Router,
        public _loginService: LoginService) { }

    ngOnInit() {
        iniciar_plugins();
        this.googleInit();
        this.email = localStorage.getItem('email') || '';
        if (this.email.length > 0) {
            this.recuerdame = true;
        }
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

    attachSignin(element) {
        this.auth2.attachClickHandler(element, {}, (googleUser) => {
            // const profile = googleUser.getBasicProfile();

            const token = googleUser.getAuthResponse().id_token;

            this._loginService.loginGoogle(token)
                .subscribe( () => {
                    this.router.navigate(['/dashboard']);
                    // Correción sugerida porque no cargaba bien el diseño del template:
                    // window.location.href = '#/home';
                });
        });

    }

    ingresar(forma: NgForm) {

        if ( forma.invalid) {
            return;
        }

        const usuario = new Usuario (forma.value.email, forma.value.password, null);

        this._loginService.login(usuario, forma.value.recuerdame)
            .subscribe( loginOk => {
                this.router.navigate(['/dashboard']);

            });
    }

}
