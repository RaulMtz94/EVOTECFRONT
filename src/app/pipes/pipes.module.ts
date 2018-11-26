import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { FechaPipe } from './fecha.pipe';
import { RutinasPipe } from './rutinas.pipe';


@NgModule({
  imports: [
    
  ],
  declarations: [
    ImagenPipe,
    FechaPipe,
    RutinasPipe
  ],
  exports:[
    ImagenPipe,
    FechaPipe,
    RutinasPipe
  ]
    
  
})
export class PipesModule { }
