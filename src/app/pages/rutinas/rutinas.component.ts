import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguimientoService, UsuarioService } from '../../services/service.index';
import { Cliente } from '../../models/cliente.model';
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
   styles: [`
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
`] 

})
export class RutinasComponent implements OnInit {
  objectKeys = Object.keys;
  cliente : Cliente[] = [];
rutinas:any={
  
    lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[],domingo:[] , nombre:[]
 
 
};
idrutina : any;
select:any;
tabla:any=[

];
detalleRutina:any[] = [];
rutinaslista:any[] = [];
contador:number=0;
dias:any=[
  "lunes","martes","miercoles","jueves","viernes","sabado","domingo"
];
totalRegistros:number = 0;
  constructor(
    public modalService : NgbModal,
    public _seguimientoService : SeguimientoService,
    public _usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    this.cargarRutinas();
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this._usuarioService.cargarUsuarios()
      .subscribe((resp : any) =>{
       
        this.totalRegistros = resp.total;
        this.cliente = resp.clientes;
      });
  }
abrirModal(content:any){
  this.modalService.open(content, { size: 'lg' });
}
agregar(dia:string){
  this.select=document.getElementById("dia");
  var diaSeleccionado = this.select.options[this.select.selectedIndex].text;
  var idEjercicio = "ejercicios"+dia;
  var idRepeticiones = "repeticiones"+dia;
  var ejercicio:any= document.getElementById(idEjercicio);
  var repeticiones:any=document.getElementById(idRepeticiones);
  var renglon = {"ejercicios":ejercicio.value,"repeticiones":repeticiones.value};
  this.rutinas[diaSeleccionado].push(renglon);
  var renglontabla = {"fila":this.contador,"dia":diaSeleccionado,"ejercicios":ejercicio.value,"repeticiones":repeticiones.value};
  this.tabla.push(renglontabla);
  this.contador++;
  //console.log(this.rutinas);
}
limpiar(){
  this.tabla=[];
  this.rutinas={
    lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[],domingo:[],nombre:[]
  }
}
guardarRutina(){
  var nombre:any= document.getElementById("nombre");
  this.rutinas["nombre"] = nombre.value;
  console.log(this.rutinas);//this.rutinas guarda el arreglo de las rutinas y dias
  this._seguimientoService.altaRutina(this.rutinas)
  .subscribe((resp : any) =>{
    
      });
}

cargarRutinas(){
  this._seguimientoService.cargarRutinas()
  .subscribe((resp : any) =>{
    console.log(resp)
    this.rutinaslista = resp;    
  });
}

abrirAsignar(content , rutina){
  this.idrutina = rutina._id;
  this.modalService.open(content, { size: 'lg' });
}
abrirDetalle(content , rutina){
  this.detalleRutina =  rutina;
  console.log(this.detalleRutina);
  this.modalService.open(content, { size: 'lg' });
}
asignarR(user : any){
  console.log(user._id);
  console.log(this.idrutina);
  this._seguimientoService.asignarRutina(this.idrutina , user._id)
  .subscribe(resp=>{
    this.cargarRutinas();
  });
}
}
