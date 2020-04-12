import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { LoginService } from '../../services/usuario/login.service';
declare function iniciar_plugins();

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.css']
})
export class HomeUsersComponent implements OnInit {

  usuario: Usuario;

  constructor( public _loginService: LoginService) {
    this.usuario = _loginService.usuario;
  }

  ngOnInit() {
    iniciar_plugins();
    console.log(this.usuario);
  }

}
