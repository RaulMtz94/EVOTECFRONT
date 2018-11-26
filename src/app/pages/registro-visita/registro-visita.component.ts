import { Component, OnInit } from '@angular/core';
import { hco_visitas } from '../../models/hco_visitas.model';
import { NgForm } from '@angular/forms';
import { SeguimientoService } from '../../services/service.index';
@Component({
  selector: 'app-registro-visita',
  templateUrl: './registro-visita.component.html',
  styles: []
})
export class RegistroVisitaComponent implements OnInit {
  visita = new hco_visitas();

  constructor(
    public _seguimientoService :SeguimientoService
  ) { }

  ngOnInit() {
  }

  registrarVisita(f: NgForm){
    this.registroBD(this.visita,f);
    this.visita.nombre='';
    this.visita.socio = false;
    this.visita.monto = '';
    this.visita.correo = '';
    this.visita.usuario = null;
  }

  registroBD(body : hco_visitas , f : NgForm){
 
    this._seguimientoService.registrarBD(body)
      .subscribe((resp:any)=>{

      });
  }

}
