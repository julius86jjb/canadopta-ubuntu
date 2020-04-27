import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Centro } from '../../models/centro.model';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

    centro: Centro;
    token: string;
    menu: any = [];

    constructor(
        public http: HttpClient,
        private router: Router,
    ) {
        this.cargarStorage();
    }

    estaLogueado() {
        return ( this.token.length > 5) ? true : false;
    }

    cargarStorage() {
        if ( localStorage.getItem('token')) {
            this.token =  localStorage.getItem('token');
            this.centro = JSON.parse(localStorage.getItem('centro'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.centro = null;
            this.menu = [];
        }
    }

    guardarStorage(id: string, token: string, centro: Centro, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('centro', JSON.stringify(centro));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.centro = centro;
        this.token = token;
        this.menu = menu;
        console.log(this.centro);

    }

    crearCentro(centro: Centro) {

        const url = URL_SERVICIOS + '/centro';

        console.log(url);
        return this.http.post(url, centro)

            .pipe(
                map( (resp: any) => {
                    Swal.fire('Centro registrado! ', centro.nombre, 'success');
                    this.centro =  resp.centro;
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


    checkEmailNotTaken(email: string) {
        const url = URL_SERVICIOS + '/centro/verificaEmailDisponible/' + email;
        return this.http.get(url)
            .pipe(
                map((resp: any) =>  resp.total <= 0)
            );
    }

    loginGoogle(token: string) {
        const url = URL_SERVICIOS + '/centro/login/google';
        return this.http.post(url, {token: token})
        .pipe(
            map((resp: any) => {

                this.guardarStorage(resp.id, resp.token, resp.centro, resp.menu);
                console.log(resp);
                return true;
            }),
            catchError(err => {

                if (err.status === 455) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error - Inicie sesión sin google',
                        text: 'Ya existe una cuenta asociada a esa dirección de email, inicie sesión sin google',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#b3c211'
                    });
                    return throwError(err);
                }

                if (err) {


                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.error.mensaje,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#b3c211'
                    });
                    return throwError(err);
                }

            })
        );
    }

}
