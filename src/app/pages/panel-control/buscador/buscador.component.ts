import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../models/usuario.model';
import { LoginService } from '../../../services/usuario/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalUsuarios = 0;
  cargando = true;
  imagenSubir: File;
  termino: string;

  constructor(
    public http: HttpClient,
    public _loginService: LoginService
  ) { }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

        this.http.get(url)
            .subscribe((resp: any) => {
              this.termino = termino;
                console.log(resp);
                this.usuarios = resp.usuarios;
                // this.medicos = resp.medicos;
                // this.hospitales = resp.hospitales;
            });
  }

  cargarUsuarios() {
    this.cargando = true;
    this._loginService.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {
            this.totalUsuarios = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
        });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalUsuarios) {
        return;
    }

    if (desde < 0) {
        return;
    }

    this.desde += valor;
    this.buscar(this.termino);
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._loginService.usuario._id) {
        Swal.fire('No se puede borrar el usuario', 'No puede borrarse a sí mismo', 'error');
        return;
    }

    Swal.fire({
        title: 'Estás seguro?',
        text: 'Estas a punto de borrar a "' + usuario.email + '"',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1abc9c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Borrar',
        cancelButtonText: 'Cancelar'
      })
      .then((borrar) => {
        if (borrar) {
            this._loginService.borrarUsuario(usuario._id)
                .subscribe( resp => {
                    this.totalUsuarios--;
                     if (this.desde === this.totalUsuarios) {
                         this.desde -= 10;
                     }
                     this.buscar(this.termino);
                });
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al borrar el usuario!',
          });
        }
      });
  }

  guardarUsuario(usuario: Usuario) {
    this._loginService.actualizarUsuario2(usuario)
      .subscribe();
  }

  async fotoPerfil(usuario: Usuario) {
    const { value: file } = await Swal.fire({
      title: 'Selecione una imagen',
      input: 'file',
      icon: 'info',
      confirmButtonText: '<i class="fa fa-save"></i> Actualizar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#63676f',
      cancelButtonColor: 'red',

      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Sube aquí tu imagen'
      }
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (evento) => {
        console.log(evento);
        Swal.fire({
          title: 'Imagen de Perfil Actualizada!',
          imageUrl: reader.result,
          imageAlt: 'Imagen Subida'
        });
        this.buscar(this.termino);
      };
      reader.readAsDataURL(file);

      this.imagenSubir = file;
      this._loginService.cambiarImagen(this.imagenSubir, usuario._id);

    }
  }
}
