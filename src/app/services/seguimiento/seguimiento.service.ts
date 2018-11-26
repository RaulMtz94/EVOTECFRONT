import { Injectable } from '@angular/core';
import { Estado } from '../../models/estado.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Cliente } from '../../models/cliente.model';
import { hco_visitas } from '../../models/hco_visitas.model';
import { URL_SERVICIOS } from '../../config/config';
import { map, repeat } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  estado : Estado;
  usuario: Usuario;
  cliente: Cliente;


  
  constructor(
    public http:HttpClient,
    public router:Router,
    public _usuarioService : UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
    this.cliente = this._usuarioService.cliente;
  }


registrarBD(_body : hco_visitas){
  let url = URL_SERVICIOS + '/hcovisitas';
  return this.http.post(url , _body).pipe(map((resp:any)=>{
    swal('Visita Registrada','Se registro una nueva visita' , 'success' );
    
  }));
}

//RELACIONADO CON LAS VISITAS
cargarVisitas(){
  let url = URL_SERVICIOS + '/hcovisitas';

  return this.http.get(url);
}

buscarVisitas( termino : string ){
  let url = URL_SERVICIOS + '/busqueda/coleccion/hco_visitas/' + termino;
    return this.http.get(url).pipe(map((resp:any)=> resp.hco_visitas));
  }
//RELACIONADO CON LAS DIETAS
cargarDietas(){
  let url = URL_SERVICIOS + '/busqueda/coleccion/dietas/';
  return this.http.get(url).pipe(map((resp:any)=> resp.dietas));
}
//CARGAR RUTINAS
cargarRutinas(){
  let url = URL_SERVICIOS + '/rutinas';
  return this.http.get(url).pipe(map((resp:any)=> resp.rutinas));
}
buscarDietas(termino : string){
  let url = URL_SERVICIOS + '/busqueda/coleccion/dietas/' + termino;
  return this.http.get(url).pipe(map((resp:any)=> resp.dietas));
}

 //CREAR DIETA
 crearDieta(dieta:any){
  let url = URL_SERVICIOS + '/dietas';
  return  this.http.post(url, dieta)
  .pipe(map((resp:any)=>{
    swal("Nueva Accion","Dieta creada", "success");
    console.log(resp);
    return resp;
  }));
}

//ACTUALIZAR DIETA
actualizarDieta( dieta : any ){
  let url = URL_SERVICIOS + '/dietas/actualizarDieta/' + dieta._id;
    return this.http.put(url , dieta).pipe(map((resp:any)=>{
      swal('Dieta actualizada', 'Se actualizo la dieta', 'success' );
      resp.dieta;
    }));
  }
  //ASIGNAR DIETA
asignarDieta( iddieta : any , idusuario : any ){
  let url = URL_SERVICIOS + '/dietas/asignarDieta/'+ idusuario +'/' + iddieta;
    return this.http.put(url , idusuario).pipe(map((resp:any)=>{
      swal('Dieta actualizada', 'Se actualizo la dieta', 'success' );
      resp.dieta;
    }));
  }
//BAJA DIETA
bajaDieta(dieta : any){
  let url = URL_SERVICIOS + '/dietas/bajaDieta/' + dieta._id;
  return this.http.put(url , dieta).pipe(map((resp:any)=>{
    swal('Dieta actualizada', 'Se actualizo la dieta', 'success' );
    resp.dieta;
  }));
}
//ALTA DIETA
altaDieta(dieta:any){
  let url = URL_SERVICIOS + '/dietas/altaDieta/' + dieta._id;
  return this.http.put(url , dieta).pipe(map((resp:any)=>{
    swal('Dieta actualizada', 'Se actualizo la dieta', 'success' );
    resp.dieta;
  }));
}


altaRutina(rutina : any){
  let url = URL_SERVICIOS + '/rutinas';
  return  this.http.post(url, rutina)
    .pipe(map((resp:any)=>{
      swal("Nuevo Registro", 'Se genero alta de rutina', "success");
      return resp;
    }));
}
//ASIGNAR DIETA
asignarRutina( idrutina : any , idusuario : any ){
  let url = URL_SERVICIOS + '/rutinas/asignarRutina/'+ idusuario +'/' + idrutina;
    return this.http.put(url , idusuario).pipe(map((resp:any)=>{
      swal('Cliente actualizado', 'Se asigno la rutina', 'success' );
      resp.rutina;
    }));
  }
//BUSCAR RUTINA CLIENTE
  buscarrutinaCliente(termino : string){
    console.log(termino);
    let url = URL_SERVICIOS + '/rutinas/rutinaCliente/' + termino;
    return this.http.get(url).pipe(map((resp:any)=> resp.rutina));
  }
  //BUSCAR DIETA CLIENTE
  buscardietaCliente(termino : string){
    console.log(termino);
    let url = URL_SERVICIOS + '/dietas/dietaCliente/' + termino;
    return this.http.get(url).pipe(map((resp:any)=> resp.rutina));
  }
}
