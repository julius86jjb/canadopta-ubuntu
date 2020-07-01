import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    SettingsService,
    SharedService,
    NavbarService,
    UsuarioService,
    LoginService,
    LoginGuardGuard,
    CentroService,
    AdminGuard,
    VerificaTokenGuard,
    GeocodeService
} from './service.index';

import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    NavbarService,
    UsuarioService,
    LoginService,
    LoginGuardGuard,
    CentroService,
    SubirArchivoService,
    AdminGuard,
    VerificaTokenGuard,
    GeocodeService

  ]
})
export class ServiceModule { }
