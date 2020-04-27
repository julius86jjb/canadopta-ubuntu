import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdopcionesComponent } from './adopciones/adopciones.component';
import { HomeComponent } from '../home/home/home.component';
import { CentrosComponent } from './centros/centros.component';
import { PagesComponent } from './pages.component';

import { ColaboraComponent } from './colabora/colabora.component';
import { ContactoComponent } from './contacto/contacto.component';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PipesModule } from '../pipes/pipes.module';
import { HomeUsersComponent } from './home-users/home-users.component';
import { ModalCompletarPerfilComponent } from '../components/modal-completar-perfil/modal-completar-perfil.component';
import { ProfileComponent } from './profile/profile.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { UsuariosComponent } from './panel-control/usuarios/usuarios.component';
import { BuscadorComponent } from './panel-control/buscador/buscador.component';
import { ModalCompletarCentroComponent } from '../components/modal-completar-centro/modal-completar-centro.component';



@NgModule({
    declarations: [
        HomeComponent,
        AdopcionesComponent,
        CentrosComponent,
        PagesComponent,
        ColaboraComponent,
        ContactoComponent,
        HomeUsersComponent,
        ModalCompletarPerfilComponent,
        ProfileComponent,
        PanelControlComponent,
        UsuariosComponent,
        BuscadorComponent,
        ModalCompletarCentroComponent
    ],
    exports: [
        HomeComponent,
        AdopcionesComponent,
        CentrosComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        SweetAlert2Module,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule {}

