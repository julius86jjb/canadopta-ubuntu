import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../usuario/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(  public _loginService: LoginService) {

  }


  canActivate() {

    if (this._loginService.usuario.role === 'ADMIN') {
      return true;
    } else {
      this._loginService.logout();
      console.log('bloqueado por el admin guard');
      return false;
    }

  }
}

