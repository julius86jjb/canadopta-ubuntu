import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { LoginService } from '../../services/usuario/login.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-completar-perfil',
  templateUrl: './modal-completar-perfil.component.html',
  styleUrls: ['./modal-completar-perfil.component.css']
})
export class ModalCompletarPerfilComponent implements OnInit {

  oculto = '';
  usuario: Usuario;
  forma: FormGroup;

  constructor(
      public _loginService: LoginService,
      public router: Router) {
    this.usuario = _loginService.usuario;

  }

  ngOnInit() {}


  guardarCambios(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.perfil_ok = true;
    this._loginService.actualizarUsuario(this.usuario)
        // tslint:disable-next-line: deprecation
        .subscribe( resp => {
          Swal.fire({
            title: 'Bienvenido a CanaAdopta!',
            imageUrl: '../../../../assets/img/port3.jpg',
            imageWidth: 800,
            confirmButtonColor: '#1abc9c',
            confirmButtonText: 'Comenzar'
          });
        });
  }
}
