import { Component, OnInit } from '@angular/core';
declare function iniciar_plugins();
declare function iniciar_plugins2();



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciar_plugins();

  }


}
