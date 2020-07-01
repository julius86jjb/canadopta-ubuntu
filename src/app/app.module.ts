import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ConfirmarEmailComponent } from './login/confirmar-email.component';
import { ComfirmarRegistroComponent } from './login/comfirmar-registro.component';

// RUTAS

import { APP_ROUTES } from './app.routes';


// MODULOS PROPIOS
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './material.module';



// SERVICIOS
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LikeDislikeComponent } from './components/like-dislike/like-dislike.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ComfirmarRegistroComponent,
    ConfirmarEmailComponent,
    LikeDislikeComponent,

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
    MaterialModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
