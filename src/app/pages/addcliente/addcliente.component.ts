import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { UsuarioService } from '../../services/service.index';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup , FormControl , Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styles: [
    `
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `
  ]
})
export class AddclienteComponent implements OnInit {

  altaCliente : FormGroup;
  closeResult: string;
  cliente : Cliente[] = [];
  totalRegistros:number = 0;
  clienteRenglon : any;
  clienteEditado : Cliente = new Cliente();
  constructor(
    public _usuarioService : UsuarioService,
    private modalService: NgbModal
  ) { }
  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }
  ngOnInit(
  ) {
    this.cargarUsuarios();
    this.altaCliente=new FormGroup({
      nombre:new FormControl(null, [Validators.required]),
      app:new FormControl(null, [Validators.required]),
      apm:new FormControl(null),
      domicilio:new FormControl(null, [Validators.required]),
      telefono:new FormControl(null,Validators.required),
      correo:new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      },   { validators: this.sonIguales( 'password', 'password2' )  } );
    
  }


  cargarUsuarios(){
    this._usuarioService.cargarUsuarios()
      .subscribe((resp : any) =>{
       
        this.totalRegistros = resp.total;
        this.cliente = resp.clientes;
      });
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true , size : 'lg' });
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
  registrarCliente(){
    if(this.altaCliente.invalid){
      swal('Alto', 'Debes completar los campos requeridos', 'warning');
      return;
    }


    var f = new Date();
    var fv = new Date();
    var fecha =(f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate());
    var fechav =(fv.getFullYear() + "/" + (fv.getMonth() +2) + "/" + fv.getDate());

    let cliente = new Cliente(
      this.altaCliente.value.nombre ,
      this.altaCliente.value.app ,
      this.altaCliente.value.apm ,
      this.altaCliente.value.domicilio ,
      this.altaCliente.value.telefono ,
      this.altaCliente.value.correo ,
      this.altaCliente.value.password ,
      'USER_ROLE',
      fecha,
      true,
      fechav
    );


      this._usuarioService.crearCliente(cliente)
        .subscribe( resp =>{
          this.cargarUsuarios();
         
        });

  }
//ABRE EL MODAL
  editarCliente(cliente:any , modal){
    this.clienteEditado._id = cliente._id;
    this.clienteEditado.nombre = cliente.nombre;
    this.clienteEditado.apellidoP = cliente.apellidoP;
    this.clienteEditado.apellidoM = cliente.apellidoM;
    this.clienteEditado.domicilio = cliente.domicilio;
    this.clienteEditado.telefono = cliente.telefono;
    

    //this.clienteRenglon = cliente;
    //console.log(this.clienteRenglon);
    this.modalService.open(modal , {size:'lg'});
  }
//ACTUALIZAR CLIENTE
  actualizarCliente(editarCliente : NgForm){
    this._usuarioService.editarCliente(this.clienteEditado)
    .subscribe( resp =>{
      this.cargarUsuarios();
    });

  }
 
  //BAJA CLIENTE
  bajaCliente(cliente:any){
    swal({
      title: "Esta seguro?",
      text: "Esta apunto de dar de baja al usuario!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.clienteEditado._id = cliente._id;
        this.clienteEditado.estatus = false;
        this._usuarioService.editarCliente(this.clienteEditado)
        .subscribe( resp =>{
          this.cargarUsuarios();
        });
        
      } 
    });
  }

  //ALTA DE USUARIO
  activarCliente(cliente:any){
    swal({
      title: "Esta seguro?",
      text: "Esta apunto de activar al usuario!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.clienteEditado._id = cliente._id;
        this.clienteEditado.estatus = true;
        this._usuarioService.editarCliente(this.clienteEditado)
        .subscribe( resp =>{
          this.cargarUsuarios();
        });
        
      } 
    });
  }

}
