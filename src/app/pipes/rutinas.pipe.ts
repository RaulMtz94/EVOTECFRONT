import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutinas'
})
export class RutinasPipe implements PipeTransform {

  transform(value: any): any {
   
   var regresar = value.toString();
   regresar = regresar.replace('"','');
   regresar = regresar.replace('"','');
   regresar = regresar.replace('"','');
   regresar = regresar.replace('"','');
   regresar = regresar.replace('{','');
   regresar = regresar.replace('}','');
   //console.log(regresar);
    return regresar;
  }

}
