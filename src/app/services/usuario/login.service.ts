import { Injectable, ɵConsole } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    usuario: Usuario;
    token: string;
    reenvio: boolean;
    menu: any = [];

    constructor(
        public http: HttpClient,
        private router: Router,
        public _subirArchivoService: SubirArchivoService
    ) {
        this.cargarStorage();
    }

    renuevaToken() {
        let url = URL_SERVICIOS + '/login/renuevatoken';
        url += '?token=' + this.token;

        return this.http.get(url)
            .pipe(
                map( (resp: any) => {
                    this.token = resp.token;
                    localStorage.setItem('token', this.token);
                    return true;
                }),
                catchError(err => {
                    this.router.navigate(['/login']);
                    Swal.fire('Error al renovar el token', 'No fue posible renovar el token', 'warning');
                    throw err;
                })
            );
    }


    cargarStorage() {
        if ( localStorage.getItem('token')) {
            this.token =  localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;

    }

    logout() {
        this.usuario = null;
        this.token = '';
        this.menu = [];

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    login(usuario: Usuario, recordar: boolean = false) {
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/login';
        return this.http.post(url, usuario)
        .pipe(
            map( (resp: any) => {

                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                return true;
            }),
            catchError(err => {

                if (err) {


                    Swal.fire({
                        icon: 'error',
                        title: 'Error al iniciar sesión',
                        text: err.error.mensaje,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#b3c211'
                    });
                    return throwError(err);
                }

            })
        );
    }

    loginGoogle(token: string, role?: string) {
        const url = URL_SERVICIOS + '/login/google';
        return this.http.post(url, {token: token, role: role})
        .pipe(
            map((resp: any) => {

                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                return true;
            }),
            catchError(err => {

                if (err.status === 455) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error al iniciar sesión',
                        text: 'Ya existe una cuenta asociada a esa dirección de email. Inicie sesión sin google',
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

    estaLogueado() {
        return ( this.token.length > 5) ? true : false;
    }

    crearUsuario(usuario: Usuario) {
        const url = URL_SERVICIOS + '/usuario';

        return this.http.post(url, usuario)
            .pipe(
                map( (resp: any) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado!',
                        text: usuario.email,
                        confirmButtonText: 'Iniciar Sesión',
                        confirmButtonColor: '#1abc9c'
                    });
                    this.usuario =  resp.usuario;
                    return resp.usuario;
                }),
                catchError(err => {
                    if (err) {


                        Swal.fire({
                            icon: 'error',
                            title: 'Error al registrar el usuario',
                            text: err.error.mensaje,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#1abc9c'
                        });
                        return throwError(err);
                    }
                })
            );
    }

    actualizarUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;

        url += '?token=' + this.token;

        return this.http.put(url, usuario)
            .pipe(
                map( (resp: any) => {

                    if (usuario._id === this.usuario._id) {
                        const usuarioDB: Usuario = resp.usuario;
                        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    }
                    return resp.usuario;
                })
            );
    }

    checkEmailNotTaken(email: string) {
        const url = URL_SERVICIOS + '/usuario/verificaEmailDisponible/' + email;
        return this.http.get(url)
            .pipe(
                map((resp: any) =>  resp.total <= 0)
            );
    }

    cambiarImagen(archivo: File, id: string) {
        this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
        .then( (resp: any) => {
            if (id === this.usuario._id) {
                const usuarioDB: Usuario = resp.usuario;
                this.usuario.img = resp.usuario.img;
                this.guardarStorage(id, this.token, this.usuario, this.menu);
            }
        })
        .catch ( resp => {
            console.log(resp);
        });
    }

    cargarUsuarios( desde: number = 0 ) {

        let url = URL_SERVICIOS + '/usuario?desde=' + desde;
        url += '&token=' + this.token;

        console.log(url);

        return this.http.get(url);
    }

    buscarUsuarios(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url)
        .pipe(
            map((resp: any) => {
                return resp.usuarios;
            })
        );
    }

    borrarUsuario( id: string) {

        const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

        return this.http.delete(url)
            .pipe(
                map( resp => {
                    Swal.fire('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
                    return true;
                })
            );
    }

}
