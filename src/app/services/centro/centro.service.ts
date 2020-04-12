import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Centro } from '../../models/centro.model';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

    centro: Centro;

    constructor(
        public http: HttpClient,
        private router: Router,
    ) { }

    crearCentro(centro: Centro) {

    const url = URL_SERVICIOS + '/centro';

    console.log(url);
    return this.http.post(url, centro)
    
        .pipe(
            map( (resp: any) =>{
                Swal.fire('Centro registrado! ', centro.nombre, 'success');
                this.centro =  resp.centro;
                return resp.centro
            }),
            catchError(err => {
                if (err) {
                   
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al registrar el centro',
                        text: err.error.mensaje,
                        confirmButtonText:'Aceptar',
                        confirmButtonColor: '#b3c211'
                    })
                    return throwError(err);
                }
            })
        );
}
}
