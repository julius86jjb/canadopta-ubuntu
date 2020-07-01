import { Component, OnInit } from '@angular/core';
import { CentroService } from '../../services/centro/centro.service';
import { LoginService } from '../../services/usuario/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Centro } from 'src/app/models/centro.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Location } from '../../models/location.model';
import { GeocodeService } from '../../services/centro/geocode.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';




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
  address = 'London';
  location: Location;
  files: File[] = [];
  time = {hour: 13, minute: 30};

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
              public _loginService: LoginService,
              private geocodeService: GeocodeService ,
              public _subirArchivoService: SubirArchivoService) {

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

  subirFotos(id_centro: string) {

    for (let i = 0; i < this.files.length; i++) {
      this.subir(i, this.files[i], id_centro);
    }
  }

  subir(idx, file, id) {

    this._subirArchivoService.subirArchivo(file, 'centros', id)
    .catch ( resp => {
        console.log(resp);
    });
  }

 crearCentro(forma: NgForm) {
  this.geocodeService.geocodeAddress(forma.value.calle + ' ' + forma.value.numero + ' ' + forma.value.provincia + ' ' + forma.value.cp)
  .subscribe((location: Location) => {
      this.location = location;
      this.usuario.nombre = forma.value.nombre;
      this.usuario.apellidos = forma.value.apellidos;
      this.usuario.telefono = forma.value.telefono;
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
          this.centro.mapa_lat = this.location.lat.toString();
          this.centro.mapa_lon = this.location.lng.toString();
          this.centro.facebook = forma.value.facebook;
          this.centro.instagram = forma.value.instagram;
          this.centro.twitter = forma.value.twitter;
          this.centro.youtube = forma.value.youtube;
          this.centro.usuario = usuario._id;
          this._centroService.crearCentro(this.centro)
            .subscribe((resp: any) => {
              this.subirFotos(resp._id);
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
    );

  }



  changeComunidad(comunidad) {
    this.provincias = this.comunidades.find(prov => prov.name === comunidad).provincias;
  }



  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


}
