import { Component, OnInit, Pipe } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SeguimientoService, UsuarioService } from '../../services/service.index';
import { Dietas } from '../../models/dietas.model';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styles: []
})
export class DietasComponent implements OnInit {
  dietas : Dietas[] = [];
  dieta : any[] = [];
  objectKeys = Object.keys;
  dias : any[] = [
    'Domingo' ,'Lunes' , 'Martes ' , 'Miercoles' , 'Jueves' , 'Viernes' , 'Sabado'
  ];
  cliente : Cliente[] = [];
  iddieta : any;
  opcion : any;
  editaDieta:any[];
  totalRegistros:number = 0;
  constructor(
    private modalService: NgbModal,
    public _seguimientoService : SeguimientoService,
    public _usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    this.cargarDietas();
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this._usuarioService.cargarUsuarios()
      .subscribe((resp : any) =>{
       
        this.totalRegistros = resp.total;
        this.cliente = resp.clientes;
      });
  }

  cargarDietas(){
    this._seguimientoService.cargarDietas()
    .subscribe((resp : any) =>{
      this.dietas = resp;
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
        this.totalRegistros = clientes.length;
      });
  }
abrirModal(content){
  this.opcion = true;
  this.dieta = [];
  this.openVerticallyCentered(content);
}
  openVerticallyCentered(content ) { 
    this.modalService.open(content, { centered: true , size : 'lg' });
  }
//ABRE EL MODAL
editarDieta(dieta : any , content){
  this.opcion = false;
  this.dieta = dieta;
  console.log(dieta);
  this.openVerticallyCentered(content);
  this.editaDieta = this.dieta;
  

}
buscarDieta(termino : string){
  if(termino.length <= 0){
    this.cargarDietas();
    return;
  }
  this._seguimientoService.buscarDietas(termino)
      .subscribe((dieta: Dietas[])=>{
        this.dietas = dieta;
        this.totalRegistros = dieta.length;
      });
}


//ALTA DE DIETA
alta(altaDieta : NgForm){
  if(this.opcion === true){
   
    this.dieta = altaDieta.value;
    console.log(this.dieta)
    this._seguimientoService.crearDieta(this.dieta)
    .subscribe( resp =>{
      this.cargarDietas();
    });
  }else{
  
    this.dietaEditar(this.editaDieta);
  }
}

dietaEditar( dieta : any){
this._seguimientoService.actualizarDieta(dieta)
  .subscribe(resp=>{
    this.cargarDietas();
  });
}


bajaDieta(  dieta:any){
  this._seguimientoService.bajaDieta(dieta)
  .subscribe(resp=>{
    this.cargarDietas();
  });
}


altaDieta(  dieta:any){
  this._seguimientoService.altaDieta(dieta)
  .subscribe(resp=>{
    this.cargarDietas();
  });
}
abrirAsignar(content , dieta){
  this.iddieta =  dieta._id;
  this.openVerticallyCentered(content);
}

asignarD(user : any){
  console.log(user._id);
  console.log(this.iddieta);
  this._seguimientoService.asignarDieta(this.iddieta , user._id)
  .subscribe(resp=>{
    this.cargarDietas();
  });
}
}
