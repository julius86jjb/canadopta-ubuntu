import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

    menu: any = [
        {
            titulo: 'Inicio',
            url: '/home',
            submenu: []
        },
        {
            titulo: 'Buscar Mascotas',
            url: '/adopciones',
            submenu: []
        },
        {
            titulo: 'Centros de Adopción',
            url: '/centros',
            submenu: []
        },
        {
            titulo: 'Colabora',
            url: '/colabora',
            submenu: []
        },
        // {
        //     titulo: 'Contacto',
        //     url: '/contacto',
        //     submenu: []
        // },

    ];

    panelUsuario: any = [
        {
            titulo: '+ Mi CanAdopta',
            url: '/',
            submenu: [
                {titulo: 'Mi Perfil', icono: 'flaticon-people', url: '/perfil'},
                {titulo: 'Mis Mascotas', icono: 'flaticon-favorite', url: ''},
                {titulo: 'Subir Macosta', icono: 'flaticon-cross', url: ''},
                // {titulo: 'Cerrar sesión', icono: 'flaticon-exit', url: '/login'}
            ]
        }
    ];

  constructor() { }

  cargarPanelUsuario() {
        return this.panelUsuario;
  }
}
