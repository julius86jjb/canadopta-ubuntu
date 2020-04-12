import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
declare function iniciar_plugins();

@Component({
  selector: 'app-comfirmar-registro',
  templateUrl: './comfirmar-registro.component.html',
  styles: [`

    h2 {
        float:center;
        margin-top: 20px;
        color: #fff;
        margin-bottom: 0px;
        font-size: 35px;
        font-weight: 700;
        letter-spacing: normal;
    }
    p span a {
        color: #b3c211;
        font-weight: bold;
    }`
  ]
})
export class ComfirmarRegistroComponent implements OnInit {

    usuario: Usuario;
    cargando = false;
    reenvio = false;

    constructor(
        public _usuarioService: UsuarioService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
        this.usuario = this._usuarioService.usuario;
        activatedRoute.params.subscribe(params => {
            const user_id = params['user_id'];

            if (user_id ) {
                this.reenviarEmail(user_id);
            }

        });

    }



    /// corregir erro de confirmar cuenta cuando hemos cambiado de email y podemos activar con email antiguo

    ngOnInit() {
        iniciar_plugins();
        console.log(this._usuarioService.reenvio);
        this.reenvio = this._usuarioService.reenvio;

    }

    reenviarEmail(user_id) {
        this.cargando = true;
        this.reenvio =  true;
        this._usuarioService.reenviarEmail(user_id)
            .subscribe((resp) => {
                console.log(resp);
                this.usuario = resp.usuario;
                this.cargando = false;
            }, (err) => this.cargando = false );
    }

    public modificarEmailyReenviar(email: string) {

        this.cargando = true;
        this._usuarioService.borrarEnRegistro(this.usuario._id)
            .subscribe(resp => console.log(resp));


        this.usuario.email = email;
        this.reenvio = true;
        console.log(this.usuario);
        const nuevo_usuario = new Usuario(
            // this.usuario.nombre,
            // this.usuario.apellidos,
            this.usuario.email,
            this.usuario.password,
            false
        );

        // this._usuarioService.crearUsuario(nuevo_usuario)
        //     .subscribe((resp: any) => {
        //         console.log(resp);
        //         this._usuarioService.reenviarEmail(resp._id)
        //             // tslint:disable-next-line: no-shadowed-variable
        //             .subscribe((resp) => {
        //                 console.log(resp);
        //                 this.usuario = resp.usuario;
        //                 this.cargando = false;
        //         }, (err) => this.cargando = false );
        //     }, (err) => this.cargando = false );

    }


}
