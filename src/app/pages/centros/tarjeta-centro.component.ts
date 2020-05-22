import { Component, OnInit, Input } from '@angular/core';
import { Centro } from '../../models/centro.model';

@Component({
  selector: 'app-tarjeta-centro',
  templateUrl: './tarjeta-centro.component.html',
  styleUrls: ['./tarjeta-centro.component.css']
})
export class TarjetaCentroComponent implements OnInit {

  @Input() centro: Centro = {};

  constructor() { }

  ngOnInit() {
  }

}
