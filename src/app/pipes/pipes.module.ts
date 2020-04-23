import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { FechaPanelControlPipe } from './fecha-panel-control.pipe';



@NgModule({
  declarations: [ImagenPipe, FechaPanelControlPipe],
  imports: [
  ],
  exports: [ImagenPipe, FechaPanelControlPipe]
})
export class PipesModule { }
