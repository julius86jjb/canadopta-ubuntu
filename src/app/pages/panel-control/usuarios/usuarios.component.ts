import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { LoginService } from '../../../services/usuario/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario;
  desde = 0;
  totalUsuarios = 0;
  cargando = true;
  imagenSubir: File;

  constructor(
    public _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
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
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
        this.cargarUsuarios();
        return;
    }

    this.cargando = true;
    this._loginService.buscarUsuarios(termino)
        .subscribe((usuarios: any) => {
            // console.log(usuarios);
            this.usuarios = usuarios;
            this.cargando = false;
        });
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
                    this.cargarUsuarios();
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
          imageUrl: evento.target.result,
          imageAlt: 'Imagen Subida'
        });
        this.cargarUsuarios();
      };
      reader.readAsDataURL(file);

      this.imagenSubir = file;
      this._loginService.cambiarImagen(this.imagenSubir, usuario._id);

    }
  }

}
