import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroService } from '../../services/centro/centro.service';
import { Centro } from 'src/app/models/centro.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { LoginService } from '../../services/usuario/login.service';
declare var $: any;


@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {

  public centro: Centro = new Centro();
  public cargando: boolean;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: false,
    maxZoom: 20,
    minZoom: 1,
  };


  constructor( private actRoute: ActivatedRoute,
    public _centroService: CentroService,
    public _usuarioService: LoginService) {
      $('.selectpicker').selectpicker();
  }

  ngOnInit() {
    this.cargando = true;
    $('.selectpicker').selectpicker();
    this.actRoute.params.subscribe( parametros => {
      const id = parametros['id'];
      this.cargarCentro(id);
    });
    this.cargando = false;

  }

  cargarCentro(id: string) {
    this._centroService.cargarCentro(id)
        .subscribe((centro: Centro) => {
            this.centro = centro;
            navigator.geolocation.getCurrentPosition(position => {
              this.center = {
                lat: Number(this.centro.mapa_lat),
                lng: Number(this.centro.mapa_lon),
              };
              this.cargando = false;
            });
        });
  }

  likeClick() {
    this.centro.likes++;
    this._centroService.actualizarLikesCentro(this.centro)
        .subscribe((centro: Centro) => {
          this._usuarioService.usuario.centrosLiked.push(centro._id);
          this._usuarioService.actualizarUsuario(this._usuarioService.usuario)
            .subscribe((user: Usuario) => {
              console.log(user);
            });
        });
  }

  likedCentro() {
    if (this._usuarioService.usuario.centrosLiked.includes(this.centro._id)) {
      return true;
    } else {
      return false;
    }
  }

  unlikeClick() {}

}


/// mejorar boton me gusra como face, unlikelick
