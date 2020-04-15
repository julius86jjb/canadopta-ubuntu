import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/service.index';
declare function iniciar_plugins();
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;

  constructor(
    public _loginService: LoginService
  ) {
    this.usuario = _loginService.usuario;
  }

  ngOnInit() {
    iniciar_plugins();
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.apellidos = usuario.apellidos;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }


    this._loginService.actualizarUsuario2(this.usuario)
      .subscribe();
  }

  seleccionImagen(archivo: File) {

    if (!archivo ) {
        this.imagenSubir = null;
        return;
    }
    if (archivo.type.indexOf('image') < 0 ) {
        Swal.fire('Solo imágenes', 'el archivo seleccionado no es una imagen', 'error');
        this.imagenSubir = null;
        return;
    }

    this.imagenSubir = archivo;


    this._loginService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

  async fotoPerfil() {
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
      };
      reader.readAsDataURL(file);

      this.imagenSubir = file;
      this._loginService.cambiarImagen(this.imagenSubir, this.usuario._id);
    }
  }



}
