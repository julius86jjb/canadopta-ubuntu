import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Centro } from '../../models/centro.model';
import { LoginService } from '../usuario/login.service';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

    totalCentros = 0;

    constructor(
        public http: HttpClient,
        private router: Router,
        public _loginService: LoginService
    ) {
    }


    crearCentro(centro: Centro) {

        const url = URL_SERVICIOS + '/centro';
        return this.http.post(url, centro)

            .pipe(
                map( (resp: any) => {
                    return resp.centro;
                }),
                catchError(err => {
                    if (err) {

                        console.log(err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al registrar el centro',
                            text: err.error.mensaje,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#b3c211'
                        });
                        return throwError(err);
                    }
                })
            );
    }

    cargarCentros(desde: number = 0) {
        let url = URL_SERVICIOS + '/centro';
        url  +=  '?token=' + this._loginService.token;

        // ?desde=' + desde
        return this.http.get(url)
          .pipe(
              map( (resp: any) => {
                  this.totalCentros = resp.total;
                  return resp.centros;
              })
          );
    }

    cargarCentro(id: string) {
        let url = URL_SERVICIOS + '/centro/' + id;
        url  +=  '?token=' + this._loginService.token;

        // ?desde=' + desde
        return this.http.get(url)
          .pipe(
              map((resp: any) => resp.centro));
    }

}
