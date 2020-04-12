import { Component, OnInit } from '@angular/core';
declare function iniciar_plugins();

@Component({
  selector: 'app-previous-register',
  templateUrl: './previous-register.component.html',
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
        h4 {
            float:center;
            margin-top: 10px;
            color: #fff;
            margin-bottom: 0px;
            font-size: 25px;
            font-weight: 700;
            letter-spacing: normal;
        }
    `]
})
export class PreviousRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciar_plugins();
  }

}
