import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Cliente } from '../../models/cliente.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Estado } from '../../models/estado.model';
import { FormGroup , FormControl , Validators, NgForm } from '@angular/forms';
 

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styles: []
})
export class SeguimientoComponent implements OnInit {
  usuario : Usuario;
  cliente : Cliente[] = [];
  estado : any;
  totalRegistros:number = 0;
  clienteEditado : Cliente = new Cliente();
  estadoCliente : Estado = new Estado();

  constructor(
    public _seguimientoService : SeguimientoService,
    public _usuarioService : UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.usuario = this._seguimientoService.usuario;
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this._usuarioService.cargarUsuarios()
      .subscribe((resp : any) =>{
       
        this.totalRegistros = resp.total;
        this.cliente = resp.clientes;
      });
  }
  cargarEstados(_id:any){
    this._usuarioService.cargarEstado(_id)
      .subscribe((resp:any)=>{
        if(resp.estado[0]){
          this.estadoCliente = resp.estado[0];
        }else{
          this.estadoCliente = new Estado();
        }
      });
  }
  
  buscarUsuario(termino : string){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarClientes(termino)
      .subscribe((clientes: Cliente[])=>{
        this.cliente = clientes;
      });
  }
  //ABRIR EL MODAL
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true , size : 'lg' });
  }


//ABRE EL MODAL
editarCliente(cliente:any , modal){
  
  this.clienteEditado._id = cliente.usuario;
  this.clienteEditado.nombre = cliente.nombre;
  this.clienteEditado.apellidoP = cliente.apellidoP;
  this.clienteEditado.apellidoM = cliente.apellidoM;
  this.clienteEditado.domicilio = cliente.domicilio;
  this.clienteEditado.telefono = cliente.telefono;
  this.cargarEstados(this.clienteEditado._id);
  //this.estadoCliente.peso 
  //this.clienteRenglon = cliente;
  //console.log(this.clienteRenglon);
  this.modalService.open(modal , {size:'lg'});
}


//ACTUALIZAR ESTADO DEL  CLIENTE
actualizarCliente(editarCliente : NgForm){

  
  this._usuarioService.editarestadoCliente(this.estadoCliente , this.clienteEditado._id)
  .subscribe( resp =>{
    this.cargarUsuarios();
  });

}

}
