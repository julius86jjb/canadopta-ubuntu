import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Centro } from '../models/centro.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { CentroService } from '../services/centro/centro.service';
import { LoginService } from '../services/usuario/login.service';


declare function iniciar_plugins();

@Component({
  selector: 'app-register-centro',
  templateUrl: './register-centro.component.html',
  styleUrls: ['./register-centro.component.css']
})
export class RegisterCentroComponent implements OnInit {

    forma: FormGroup;
    cargando = false;
    // tipo_centro = [
    //         { id: 1, label: 'Protectora' },
    //         { id: 2, label: 'Albergue' },
    //         { id: 3, label: 'Perrera' },
    //         { id: 4, label: 'Refugio' }
    //     ];


    comunidades: Array<any> = [
        { name: 'Andalucía', provincias: ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla' ] },
        { name: 'Aragón', provincias: ['Huesca', 'Teruel', 'Zaragoza'] },
        { name: 'Principado de Asturias', provincias: ['Asturias'] },
        { name: 'Islas Baleares', provincias: ['Baleares'] },
        { name: 'Canarias', provincias: ['Las Palmas', 'Santa Cruz de Tenerife' ] },
        { name: 'Cantabria', provincias: ['Cantabria'] },
        { name: 'Castilla-La Mancha', provincias: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'] },
        // tslint:disable-next-line: max-line-length
        { name: 'Castilla y León', provincias: ['Palencia', 'León', 'Zamora', 'Valladolid', 'Salamanca', 'Ávila', 'Segovia', 'Soria', 'Burgos' ] },
        { name: 'Cataluña', provincias: ['Barcelona', 'Gerona', 'Lérida', 'Tarragona'] },
        { name: 'Comunidad Valenciana', provincias: ['Alicante', 'Castellón de la Plana', 'Valencia'] },
        { name: 'Extremadura', provincias: ['Badajoz', 'Cáceres'] },
        { name: 'Galicia', provincias: ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'] },
        { name: 'Comunidad de Madrid', provincias: ['Madrid'] },
        { name: 'Región de Murcia', provincias: ['Murcia'] },
        { name: 'Comunidad Foral de Navarra', provincias: ['Navarra'] },
        { name: 'País Vasco', provincias: [ 'Vizcaya', 'Guipúzcoa', 'Álava' ] },
        { name: 'La Rioja', provincias: ['La Rioja'] },
        { name: 'Ceuta', provincias: ['Ceuta'] },
        { name: 'Melilla', provincias: ['Melilla'] }

    ];

    provincias: Array<any>;

    constructor(
        public _centroService: CentroService,
        public _loginService: LoginService,
        public router: Router,
    ) { }

    ngOnInit() {
        iniciar_plugins();

        this.forma = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
            ], this.validateEmailNotTaken.bind(this) ),
            password: new FormControl(null, [Validators.required,  Validators.minLength(6), Validators.maxLength(30)]),
            password2: new FormControl(null, Validators.required),
            nombre_centro: new FormControl(null, Validators.required ),
            telefono: new FormControl(null, Validators.required ),
            comunidad_aut: new FormControl(null, Validators.required ),
            prov: new FormControl(null, Validators.required ),
            condiciones: new FormControl(false)
        }, { validators: [ this.sonIguales('password', 'password2')]}
        );

    }

    sonIguales(campo1: string, campo2: string) {

        return (group: FormGroup) => {

            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if ( pass1 === pass2) {
                return null;
            }
            return {
                sonIguales: true,
            };
        };
    }

    validateEmailNotTaken(control: AbstractControl) {
        return this._loginService.checkEmailNotTaken(control.value)
            .pipe(
                map(res => {
                    return res ? null : { emailTaken: true };
                  })
            );
    }

    registrarCentro() {



        const Toast = Swal.mixin({
            confirmButtonColor: '#b3c211',
        });
        // console.log(this.forma);
        if (this.forma.invalid) {
            Toast.fire('Error', 'Corrija los errores del formulario', 'error');
            return;
        }

        if (!this.forma.value.condiciones) {
            Toast.fire('Importante', 'Debe acepta las condiciones', 'warning');
            return;
        }

        const usuario = new Usuario(
            // this.forma.value.nombre,
            // this.forma.value.apellidos,
            this.forma.value.email,
            this.forma.value.password,
            false,
            'GESTOR'
        );


        // this.cargando = true;
        this._loginService.crearUsuario(usuario)
            .subscribe( resp => {
                console.log(resp);
                const centro = new Centro(
                    this.forma.value.nombre_centro,
                    this.forma.value.telefono,
                    resp._id,
                    this.forma.value.comunidad_aut,
                    this.forma.value.prov
                );
                console.log(centro);
                this._centroService.crearCentro(centro)
                    // tslint:disable-next-line: no-shadowed-variable
                    .subscribe( resp => {
                        console.log(resp);
                        this.router.navigate(['/login']);
                        this.cargando = false;
                }, (err) => this.cargando = false );

            }, (err) => this.cargando = false );
    }


    changeComunidad(comunidad) {
        this.provincias = this.comunidades.find(prov => prov.name === comunidad).provincias;
    }
}
