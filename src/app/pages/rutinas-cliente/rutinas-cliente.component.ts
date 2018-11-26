import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { UsuarioService, SeguimientoService } from '../../services/service.index';

@Component({
  selector: 'app-rutinas-cliente',
  templateUrl: './rutinas-cliente.component.html',
  styles: []
})
export class RutinasClienteComponent implements OnInit {
  cliente : Cliente;
  objectKeys = Object.keys;
  detalleRutina:any[] = [];
  show:boolean = false;
  constructor(
    public _usuarioService:UsuarioService,
    public _seguimientoService : SeguimientoService,
  ) { 
    
  }

  

  ngOnInit() {
    this.cliente = this._usuarioService.cliente;
    this._seguimientoService.buscarrutinaCliente(this.cliente[0].rutina)
    .subscribe((resp : any) =>{
    
    this.detalleRutina = resp[0];
    console.log(this.detalleRutina);
    this.show = true;
     });
  
    
    
  }

}
