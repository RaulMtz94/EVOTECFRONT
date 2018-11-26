import { Component, OnInit } from '@angular/core';
import { hco_visitas } from '../../models/hco_visitas.model';
import { SeguimientoService } from '../../services/seguimiento/seguimiento.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: []
})
export class HistoricoComponent implements OnInit {
  historico : hco_visitas[]=[];
  constructor(
    public _seguimientoService : SeguimientoService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

  }
  cargarUsuarios(){
    this._seguimientoService.cargarVisitas()
      .subscribe((resp : any) =>{
        console.log(resp.historicos);
       this.historico = resp.historicos;
        
      });
  }
  buscarUsuario(termino : string){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this._seguimientoService.buscarVisitas(termino)
      .subscribe((historico: hco_visitas[])=>{
        this.historico = historico;
      });
  }

}
