import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home/home.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { ComfirmarRegistroComponent } from './login/comfirmar-registro.component';
import { ConfirmarEmailComponent } from './login/confirmar-email.component';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    // { path: 'conf_registro', component: ComfirmarRegistroComponent },
    // { path: 'conf_registro/:user_id', component: ComfirmarRegistroComponent },
    // { path: 'confirmar_email/:user_id', component: ConfirmarEmailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, data : {titulo: 'CanAdopta - Inicio'}  },
    { path: '**', component: NopagefoundComponent  },

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});
