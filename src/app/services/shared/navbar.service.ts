import { Injectable } from '@angular/core';
import { LoginService } from '../usuario/login.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

    menuEstatico: any = [
        { titulo: 'Inicio', url: '/dashboard', submenu: [] },
        { titulo: 'Buscar Mascotas', url: '/adopciones', submenu: [] },
        { titulo: 'Centros de Adopción', url: '/centros', submenu: [] },
        { titulo: 'Colabora', url: '/colabora', submenu: [] },
        { titulo: 'Contacto', url: '/contacto', submenu: [] },
    ];

//     panelUsuario: any = [
//         {
//             titulo: '+ Mi CanAdopta',
//             url: '/',
//             submenu: [
//                 {titulo: 'Mi Perfil', icono: 'flaticon-people', url: '/perfil'},
//                 {titulo: 'Mis Mascotas', icono: 'flaticon-favorite', url: ''},
//                 {titulo: 'Mis Centros de Adopción', icono: 'flaticon-internet', url: ''},
//                 {titulo: 'Publicar Macosta', icono: 'flaticon-cross', url: ''},
//                 {titulo: 'Panel de Control', icono: 'flaticon-monitor', url: '/panel_control'},
//                 // {titulo: 'Cerrar sesión', icono: 'flaticon-exit', url: '/login'}
//             ]
//         }
//     ];

//   constructor() { }

//   cargarPanelUsuario() {
//         return this.panelUsuario;
//   }

    menu: any[] = [];

    constructor( public _loginService: LoginService) { }

    cargarMenusUsuario() {
        this.menu =  this._loginService.menu;
    }

}
