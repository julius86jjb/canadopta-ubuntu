import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../usuario/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

    constructor( public _loginService: LoginService,
        public router: Router){

    }

    canActivate() {
        if(this._loginService.estaLogueado()){
            console.log('pasa guard');
            return true;
        } else{
            console.log('blcked guard');
            this.router.navigate(['/login'])
            return false;
        }
        
    }
  
}
