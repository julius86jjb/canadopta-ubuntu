import { Routes, RouterModule } from '@angular/router';

import { AdopcionesComponent } from './adopciones/adopciones.component';
import { CentrosComponent } from './centros/centros.component';
import { ColaboraComponent } from './colabora/colabora.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from '../home/home/home.component';
import { HomeUsersComponent } from './home-users/home-users.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { CentroComponent } from './centros/centro.component';

const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            { path: 'adopciones', component: AdopcionesComponent, data : {titulo: 'CanAdopta - Adopciones'}  },
            { path: 'centros', component: CentrosComponent, data : {titulo: 'CanAdopta - Centros de Adopción'}  },
            { path: 'colabora', component: ColaboraComponent, data : {titulo: 'CanAdopta - Colabora'}  },
            { path: 'contacto', component: ContactoComponent, data : {titulo: 'CanAdopta - Contacto'}  },
            { path: 'dashboard', component: HomeUsersComponent, data : {titulo: 'CanAdopta - Dashboard'} },
            { path: 'perfil', component: ProfileComponent, data : {titulo: 'CanAdopta - Perfil de Usuario'}},
            { path: 'centro/:id', component: CentroComponent, data : {titulo: 'CanAdopta - Centro de Adopción'}  },

            // Panel de Control

            { path: 'panel_control', component: PanelControlComponent,
                    data : {titulo: 'CanAdopta - Panel de Control'},
                    canActivate: [AdminGuard]
            },

            { path: '', redirectTo: '/home', pathMatch: 'full' }


        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );
