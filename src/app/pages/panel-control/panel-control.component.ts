import { Component, OnInit } from '@angular/core';
declare function iniciar_plugins();

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciar_plugins();
  }

}
