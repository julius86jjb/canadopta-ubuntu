import { Component, OnInit } from '@angular/core';
import { Centro } from 'src/app/models/centro.model';
import { CentroService } from '../../services/centro/centro.service';
import { Router } from '@angular/router';
declare function iniciar_plugins();

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  centros: Centro[] = [];
  cargando = true;
  totalCentros = 0;
  desde = 0;

  constructor(private _centroService: CentroService,
    private router: Router
    ) { }

  ngOnInit() {
    iniciar_plugins();
    this.cargarCentros();
  }

  cargarCentros() {
    this.cargando = true;
    this._centroService.cargarCentros(this.desde)
        .subscribe( (centros: any) => {
            console.log(centros);
            this.totalCentros = this._centroService.totalCentros;
            this.centros = centros;
            this.cargando = false;
        });
}

}
