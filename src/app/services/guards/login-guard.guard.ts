import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../usuario/login.service';
import { CentroService } from '../centro/centro.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

    constructor( public _loginService: LoginService,
        public router: Router) {

    }

    canActivate() {
        if (this._loginService.estaLogueado() )  {
            return true;
        } else {
            this.router.navigate(['/login']);
            console.log('blokeado por el login');
            return false;
        }

    }

}
