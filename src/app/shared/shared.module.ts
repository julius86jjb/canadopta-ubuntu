import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { BigfooterComponent } from './bigfooter/bigfooter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PipesModule } from '../pipes/pipes.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SweetAlert2Module,
        PipesModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        NavbarComponent,
        BigfooterComponent,
        FooterComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        NavbarComponent,
        BigfooterComponent,
        FooterComponent
    ]
})


export class SharedModule {}

