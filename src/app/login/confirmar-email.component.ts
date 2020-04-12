import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styles: []
})
export class ConfirmarEmailComponent implements OnInit {

    cargando: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService
  ) { 
    activatedRoute.params.subscribe(params => {
        const user_id = params['user_id'];

        if (user_id !== null) {
            this.confirmarEmail(user_id);
        }
        
    });
  }

  ngOnInit() {
      
  }

  confirmarEmail(user_id) {
    this._usuarioService.confirmarEmail(user_id)
        .subscribe((resp) => {
            this.cargando = false;
            this.router.navigate(['/login']);
            
        },
            (err) => this.cargando = false 
        );
  }

}
