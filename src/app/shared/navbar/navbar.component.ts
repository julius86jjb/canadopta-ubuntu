import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/service.index';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { LoginService } from '../../services/usuario/login.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    titulo: string;
    logeado = false;
    usuario: Usuario;
    menuNav: any = [];

    constructor(public _navBarService: NavbarService,
                    public _loginService: LoginService,
                    private router: Router,
                    private title: Title,
                    private meta: Meta) {

    this.logeado = this._loginService.estaLogueado();

    this.getTituloRuta()
        .subscribe( data => {
            // console.log(event);
            this.titulo = data.titulo;
            this.title.setTitle( this.titulo);


            const metaTag: MetaDefinition = {
                name: 'description',
                content: this.titulo
            };
            this.meta.updateTag(metaTag);
        });
    }

    ngOnInit() {
        this.usuario = this._loginService.usuario;
        this._navBarService.cargarMenusUsuario();
        this.menuNav = this._navBarService.menu[0];
    }

    getTituloRuta() {
        return this.router.events
            .pipe(
                filter(event => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map( (event: ActivationEnd) => event.snapshot.data  )
            );

    }





}
