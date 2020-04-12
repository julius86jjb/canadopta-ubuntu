import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/usuario/login.service';
import { Router } from '@angular/router';

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

  attachSignin(element) {
      this.auth2.attachClickHandler(element, {}, (googleUser) => {
          // const profile = googleUser.getBasicProfile();

          const token = googleUser.getAuthResponse().id_token;

          this._loginService.loginGoogle(token)
              .subscribe( () => {
                  this.router.navigate(['/dashboard']);
                  // Correción sugerida porque no cargaba bien el diseño del template:
                  // window.location.href = '#/dashboard';
              });
      });

  }

}
