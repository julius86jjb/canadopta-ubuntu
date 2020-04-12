import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    reenvio: boolean;

    constructor(
        public http: HttpClient,
        private router: Router,
        private zone: NgZone
    ) {
    }


    // crearUsuario(usuario: Usuario) {

    //     const url = URL_SERVICIOS + '/usuario';

    //     return this.http.post(url, usuario)
    //         .pipe(
    //             map( (resp: any) => {
    //                 // Swal.fire('Usuario registrado!', usuario.email, 'success');
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Usuario registrado!',
    //                     text: usuario.email,
    //                     confirmButtonText: 'Iniciar Sesión',
    //                     confirmButtonColor: '#1abc9c'
    //                 });
    //                 this.usuario =  resp.usuario;
    //                 return resp.usuario;
    //             }),
    //             catchError(err => {
    //                 if (err) {


    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error al registrar el usuario',
    //                         text: err.error.mensaje,
    //                         confirmButtonText: 'Aceptar',
    //                         confirmButtonColor: '#1abc9c'
    //                     });
    //                     return throwError(err);
    //                 }
    //             })
    //         );
    // }

    // checkEmailNotTaken(email: string) {
    //     const url = URL_SERVICIOS + '/usuario/verificaEmailDisponible/' + email;
    //     return this.http.get(url)
    //         .pipe(
    //             map((resp: any) =>  resp.total <= 0)
    //         );
    // }

    reenviarEmail(user_id: string) {

        const url = URL_SERVICIOS + '/usuario/reenviar_email/' + user_id;

        return this.http.get(url)
            .pipe(
                map( (resp: any) => {
                    this.reenvio = true;
                    this.usuario = resp.usuario;
                    console.log(this.usuario);
                    return resp;


                }),
                catchError(err => {
                    if (err.status === 409) {


                        this.router.navigate(['/login']);
                        Swal.fire({
                            icon: 'success',
                            title: 'Inicie Sesión',
                            // tslint:disable-next-line: max-line-length
                            text: 'Su cuenta fue activada anteriormente. Inicie sesión con la dirección de email a través de la cual activó su cuenta',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#b3c211'
                        });
                        return throwError(err);
                    }
                })
            );
    }

    actualizarUsuario(usuario: Usuario) {


        const url = URL_SERVICIOS + '/usuario/' + usuario._id;

        return this.http.put(url, usuario)
            .pipe(
                map( (resp: any) => {

                    this.usuario = resp.usuario;
                    return resp;
                }),
                catchError(err => {
                    this.router.navigate(['/register']);
                    if (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al actualizar el usuario',
                            text: err.error.mensaje,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#b3c211'
                        });
                        return throwError(err);
                    }
                })
            );
    }




    confirmarEmail(user_id: string) {
        const url = URL_SERVICIOS + '/usuario/confirmarEmail/' + user_id;

        return this.http.get(url)
        .pipe(
            map( (resp: any) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta Activada',
                    text: resp.usuario.email,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#b3c211'
                });
                this.usuario = resp.usuario;
                return resp;
            }),
            catchError(err => {
                if (err.status === 414) {
                    console.log(err);
                    this.router.navigate(['/login']);
                    Swal.fire({
                        title: 'Error al activar su cuenta',
                        text: err.error.mensaje,
                        icon: 'warning',
                        confirmButtonColor: '#b3c211',
                        confirmButtonText: 'Reenviar email de activación'
                    })
                    .then((reenviar) => {
                        if (reenviar) {
                            this.reenvio = true;
                            this.router.navigate(['/conf_registro/' + err.error.user_id ]);
                        }
                    });
                    return throwError(err);
                }
                if (err.status === 415) {

                    this.router.navigate(['/register']);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error al activar su cuenta',
                        text: 'No ha sido posible encontrar un usuario con esa dirección de email',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#b3c211'
                    });
                    return throwError(err);
                }
                if (err.status === 416) {
                    console.log(err);
                    this.router.navigate(['/login']);
                    Swal.fire({
                        icon: 'success',
                        title: 'Inicie Sesión',
                        text: 'La cuenta ya fue activada anteriormente, inicie Sesión con su dirección de email',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#b3c211'
                    });
                    return throwError(err);
                }
            })
        );
    }

    // borrarUsuario( id: string) {

    //     const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    //     return this.http.delete(url)
    //         .pipe(
    //             map( resp => {
    //                 swal('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
    //                 return true;
    //             })
    //         );
    // }

    borrarEnRegistro( id: string) {

        const url = URL_SERVICIOS + '/usuario/borrarEnRegistro/' + id;

        return this.http.get(url)
            .pipe(
                map( (resp: any) => {
                    console.log(resp);
                    return resp.usuario;
                })
            );
    }







}
