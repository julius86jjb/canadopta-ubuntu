import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroService } from '../../services/centro/centro.service';
import { Centro } from 'src/app/models/centro.model';
declare function iniciar_plugins();

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {

  public centro: Centro;

  constructor( private actRoute: ActivatedRoute,
    public _centroService: CentroService) {

    actRoute.params.subscribe( parametros => {
      const id = parametros['id'];
      this.cargarCentro(id);
    });

  }

  ngOnInit() {
    iniciar_plugins();
  }

  cargarCentro(id: string) {
    this._centroService.cargarCentro(id)
        .subscribe((centro) => {
            this.centro = centro;
        });
}

}
