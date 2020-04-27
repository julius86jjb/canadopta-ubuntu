import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../usuario/login.service';
import { CentroService } from '../centro/centro.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


    constructor( public _loginService: LoginService,
            public _centroService: CentroService,
              public router: Router) {

    }

    canActivate():  Promise<boolean> | boolean {


      let token = this._loginService.token;
      if (token === null) {
          token = this._centroService.token;
      }

      const payload = JSON.parse( atob( token.split('.')[1] ));

      const expirado = this.expirado(payload.exp);

      if (expirado ) {
          this.router.navigate(['/login']);
          return false;
      }

      return this.verificaRenueva(payload.exp);
    }


    expirado(fecha_expiracion: number) {
          const ahora = new Date().getTime() / 1000;

          if (fecha_expiracion < ahora) {
              return true;
          } else {
              return false;
          }
    }

    verificaRenueva( fecha_expiracion: number): Promise<boolean> {
      return new Promise ((resolve, reject) => {
          const tokenExp = new Date ( fecha_expiracion * 1000);
          const ahora = new Date();

          ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000) ); // cuando falte una hora actualizaremos el token

          if (tokenExp.getTime() > ahora.getTime()) {
              resolve(true);
          } else {
              this._loginService.renuevaToken()
                  .subscribe(
                      () => {
                          resolve(true);
                      },
                      () => {
                          reject(false);
                          this.router.navigate(['/login']);
                      }
                  );
          }

          resolve(true);
      });
    }

}
