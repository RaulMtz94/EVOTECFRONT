import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { UsuarioService, SeguimientoService } from '../../services/service.index';
@Component({
  selector: 'app-dietas-cliente',
  templateUrl: './dietas-cliente.component.html',
  styles: []
})
export class DietasClienteComponent implements OnInit {
  cliente : Cliente;
  objectKeys = Object.keys;
  detalleDieta:any[] = [];
  days:any[]=[];
  dias : any[] = ['lunes' , 'martes' , 'miercoles' , 'jueves' , 'viernes' , 'sabado' , 'domingo'];
  show:boolean = false;
  constructor(
    public _usuarioService:UsuarioService,
    public _seguimientoService : SeguimientoService,
  ) { }

  ngOnInit() {
    this.cliente = this._usuarioService.cliente;
    this._seguimientoService.buscardietaCliente(this.cliente[0].dieta)
    .subscribe((resp : any) =>{
    this.detalleDieta = resp[0];
    this.days = resp[0].dias;
    console.log(this.days);
    this.show = true;
     });
  }

}
