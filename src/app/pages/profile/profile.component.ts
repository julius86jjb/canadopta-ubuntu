import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/service.index';
declare function iniciar_plugins();
import Swal from 'sweetalert2';
import { NavbarService } from '../../services/shared/navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  menuPerfil: any = [];
  time = {hour: 13, minute: 30};

  constructor(
    public _loginService: LoginService,
    public _navBarService: NavbarService
  ) {
    this.usuario = _loginService.usuario;
  }

  ngOnInit() {
    iniciar_plugins();
    this._navBarService.cargarMenusUsuario();
    this.menuPerfil = this._navBarService.menu[1];
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.telefono = usuario.telefono;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }


    this._loginService.actualizarUsuario(this.usuario)
      .subscribe( resp => {
        console.log(resp);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Usuario actualizado!'
        });
      });
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
        console.log(reader.result);
        Swal.fire({
          title: 'Imagen de Perfil Actualizada!',
          imageUrl: reader.result,
          imageAlt: 'Imagen Subida'
        });
      };
      reader.readAsDataURL(file);

      this.imagenSubir = file;
      this._loginService.cambiarImagen(this.imagenSubir, this.usuario._id);
    }
  }

  verificarUsuario() {
    console.log(this.usuario.verificado);
  }



}
