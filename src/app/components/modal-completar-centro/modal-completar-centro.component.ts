import { Component, OnInit } from '@angular/core';
import { CentroService } from '../../services/centro/centro.service';
import { LoginService } from '../../services/usuario/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Centro } from 'src/app/models/centro.model';

@Component({
  selector: 'app-modal-completar-centro',
  templateUrl: './modal-completar-centro.component.html',
  styleUrls: ['./modal-completar-centro.component.css']
})
export class ModalCompletarCentroComponent implements OnInit {


  usuario: Usuario;
  centro: Centro;

  constructor( public _centroService: CentroService,
              public _loginService: LoginService) {

    this.usuario = this._loginService.usuario;
    this.centro = this._centroService.centro;
  }

  ngOnInit() {
    this.usuario = this._loginService.usuario;
    this.centro = this._centroService.centro;
    console.log(this.usuario);
    console.log(this.centro);
  }

  guardarCambios() {

  }

}
