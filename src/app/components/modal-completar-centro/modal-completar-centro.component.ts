import { Component, OnInit } from '@angular/core';
import { CentroService } from '../../services/centro/centro.service';
import { LoginService } from '../../services/usuario/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Centro } from 'src/app/models/centro.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-modal-completar-centro',
  templateUrl: './modal-completar-centro.component.html',
  styleUrls: ['./modal-completar-centro.component.css'],
})
export class ModalCompletarCentroComponent implements OnInit {


  usuario: Usuario;
  centro = new Centro();
  public oculto = 'oculto';

  comunidades: Array<any> = [
    { name: 'Andalucía', provincias: ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla' ] },
    { name: 'Aragón', provincias: ['Huesca', 'Teruel', 'Zaragoza'] },
    { name: 'Principado de Asturias', provincias: ['Asturias'] },
    { name: 'Islas Baleares', provincias: ['Baleares'] },
    { name: 'Canarias', provincias: ['Las Palmas', 'Santa Cruz de Tenerife' ] },
    { name: 'Cantabria', provincias: ['Cantabria'] },
    { name: 'Castilla-La Mancha', provincias: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'] },
    // tslint:disable-next-line: max-line-length
    { name: 'Castilla y León', provincias: ['Palencia', 'León', 'Zamora', 'Valladolid', 'Salamanca', 'Ávila', 'Segovia', 'Soria', 'Burgos' ] },
    { name: 'Cataluña', provincias: ['Barcelona', 'Gerona', 'Lérida', 'Tarragona'] },
    { name: 'Comunidad Valenciana', provincias: ['Alicante', 'Castellón de la Plana', 'Valencia'] },
    { name: 'Extremadura', provincias: ['Badajoz', 'Cáceres'] },
    { name: 'Galicia', provincias: ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'] },
    { name: 'Comunidad de Madrid', provincias: ['Madrid'] },
    { name: 'Región de Murcia', provincias: ['Murcia'] },
    { name: 'Comunidad Foral de Navarra', provincias: ['Navarra'] },
    { name: 'País Vasco', provincias: [ 'Vizcaya', 'Guipúzcoa', 'Álava' ] },
    { name: 'La Rioja', provincias: ['La Rioja'] },
    { name: 'Ceuta', provincias: ['Ceuta'] },
    { name: 'Melilla', provincias: ['Melilla'] }

  ];

  provincias: Array<any>;

  constructor( public _centroService: CentroService,
              public _loginService: LoginService) {

    this.usuario = this._loginService.usuario;
  }

  ngOnInit() {
  }

  ocultarModal() {
    this.oculto = 'oculto';
  }

  mostrarModal() {
    this.oculto = '';
  }

 crearCentro(forma: NgForm) {
  this.usuario.nombre = forma.value.nombre;
  this.usuario.apellidos = forma.value.apellidos;
  this.usuario.telefono = forma.value.telefono;
  // this.usuario.perfil_ok = true;
  this._loginService.actualizarUsuario(this.usuario)
      .subscribe( (usuario: Usuario) => {
        this.centro.nombre_centro = forma.value.nombre_centro;
        this.centro.telefono = forma.value.telefono_prin;
        this.centro.direccion_comunidad = forma.value.comunidad;
        this.centro.direccion_provincia = forma.value.provincia;
        this.centro.tipoCentro = forma.value.tipo_centro;
        this.centro.email_centro = forma.value.email_centro;
        this.centro.telefono2 = forma.value.telefono_sec;
        this.centro.web = forma.value.web;
        this.centro.personaContacto = forma.value.persona_cont;
        this.centro.descripcion = forma.value.desc;
        this.centro.procesoAdopcion = forma.value.proceso_adop;
        this.centro.amplitudAdopcion = forma.value.amplitud;
        this.centro.totalAdoptables = 0;
        this.centro.direccion_calle = forma.value.calle;
        this.centro.direccion_numero = forma.value.numero;
        this.centro.direccion_CP = forma.value.cp;
        this.centro.facebook = forma.value.facebook;
        this.centro.instagram = forma.value.instagram;
        this.centro.twitter = forma.value.twitter;
        this.centro.youtube = forma.value.youtube;
        this.centro.usuario = usuario._id;
        this._centroService.crearCentro(this.centro)
          .subscribe((resp: any) => {
            console.log(resp);
            this.usuario.perfil_ok = true;
            this._loginService.actualizarUsuario(this.usuario)
              .subscribe( (resp2: any) => {
                Swal.fire({
                  title: 'Bienvenido a CanaAdopta!',
                  imageUrl: '../../../../assets/img/port3.jpg',
                  imageWidth: 800,
                  confirmButtonColor: '#1abc9c',
                  confirmButtonText: 'Comenzar'
                });
              });
          });

      });
 }



  changeComunidad(comunidad) {
    this.provincias = this.comunidades.find(prov => prov.name === comunidad).provincias;
}

// a traves de un event emmitter hacer una notificacion pa refrescar todo,ver videos event emitter
}
