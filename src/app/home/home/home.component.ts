import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/usuario/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare function iniciar_plugins();
declare const  gapi: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth2: any;

  constructor(
      public router: Router,
      public _loginService: LoginService
  ) { }

  ngOnInit() {
      iniciar_plugins();
      this.googleInit();
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


  async attachSignin(element) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    this.auth2.attachClickHandler(element, {}, async (googleUser) => {
        this._loginService.buscarUsuarios(googleUser.Qt.zu)
            .subscribe(async (res: any) => {
                if (res.length ===  0 ) {
                    const { value: color } = await Swal.fire({
                        title: 'Perfil de usuario',
                        text: 'Seleccione un tipo de usuario',
                    input: 'radio',
                        icon: 'question',
                        inputOptions: {
                            'BASICO': 'Adoptante',
                            'GESTOR': 'Centro de adopción'
                        },
                        inputValidator: (value) => {
                            if (!value) {
                            return 'Debe seleccionar un tipo de usuario!';
                            }
                        }
                    });

                    if (color) {

                        const token = googleUser.getAuthResponse().id_token;
                        this._loginService.loginGoogle(token, color)
                            .subscribe( () => {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Usuario registrado!'
                                    });
                                // this.router.navigate(['/dashboard']);
                                // Correción sugerida porque no cargaba bien el diseño del template:
                                window.location.href = '#/dashboard';
                            });
                    }
                } else {
                    const token = googleUser.getAuthResponse().id_token;
                    this._loginService.loginGoogle(token)
                        .subscribe( () => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Has iniciado sesión!'
                                });
                               // this.router.navigate(['/dashboard']);
                            // Correción sugerida porque no cargaba bien el diseño del template:
                            window.location.href = '#/dashboard';
                        });
                }
            });

    });
  }


}
