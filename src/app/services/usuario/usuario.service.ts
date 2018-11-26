import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, repeat , catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { Estado } from '../../models/estado.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  cliente: Cliente;
  estado : Estado;
  token: string;
  menu : any[] = [];
  constructor(
    public http:HttpClient,
    public router:Router,
    public _subirArchivoService : SubirArchivoService
  ) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      if(localStorage.getItem('cliente')){
        this.cliente = JSON.parse(localStorage.getItem('cliente'));
      }
    }else{
      this.token ='';
      this.usuario = null;
      this.menu = [];
    }
  }

//GUARDAR STORAGE
//Recoger datos del usuario
getestadoCliente(id:any = null){
 // this.cargarStorage();
 if(id){
  let url = URL_SERVICIOS + '/cliente/estadoACT/' + id;
  return this.http.get(url);
 }else if (id===null){
  let url = URL_SERVICIOS + '/cliente/estadoACT/' + this.usuario._id;
  return this.http.get(url);
 }
 
}

//CREAR USUARIO
  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return  this.http.post(url, usuario)
    .pipe(map((resp:any)=>{
      swal("Usuario Creado", usuario.email, "success");
      console.log(resp);
      return resp.usuario;
    }));
  }

  //CREAR USUARIO
  crearCliente(cliente:Cliente){
    let url = URL_SERVICIOS + '/usuario';
    return  this.http.post(url, cliente)
    .pipe(map((resp:any)=>{
      swal("Usuario Creado", cliente.email, "success");
      console.log(resp);
      return resp;
    }),catchError((err, caught) => {
      swal('Error' , 'Error el email ya fue registrado' , 'error');
      return Observable.throw(err);
    }));
  }

//GUARDAR EN STORAGE
  guardarStorage( id: string, token: string, usuario: Usuario , cliente : any = null , menu: any ) {
    if(cliente===null){
      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('usuario', JSON.stringify(usuario) );
      localStorage.setItem('menu', JSON.stringify(menu) );


      this.usuario = usuario;
      this.token = token;
      this.menu = menu;

    }else{
      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('usuario', JSON.stringify(usuario) );
      localStorage.setItem('cliente', JSON.stringify(cliente) );
      localStorage.setItem('menu', JSON.stringify(menu) );

  
      this.usuario = usuario;
      this.cliente = cliente;
      this.token = token;
      this.menu = menu;

      
    }

   
  }
  //LOGOUT
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('cliente');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    
  }


  //LOGUEAR USUARIO
  login( usuario:Usuario, recordar: boolean = false){
    
    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario).pipe(map((resp:any)=>{
      if(resp.cliente){
        console.log("Paso por aqui");
        this.guardarStorage( resp.id, resp.token, resp.usuario  , resp.cliente ,resp.menu );
      }else{
        console.log("Se guardo");
        console.log(resp.menu);
        this.guardarStorage( resp.id, resp.token, resp.usuario  , resp.cliente , resp.menu);
      }

      return true;
    }),catchError((err, caught) => {
      swal('Error' , 'El usuario/contraseña son incorrectos' , 'error');
      return Observable.throw(err);
    }));
  }


  cambiarImagen( archivo:File , id: string ){
  this._subirArchivoService.subirArchivo(archivo , 'usuarios' , id)
    .then((resp : any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada' , this.usuario.nombre , 'success');
      this.guardarStorage(id , this.token , this.usuario , this.cliente , this.menu);
    })
    .catch(resp =>{
      console.log(resp);
    });
  }

  cargarUsuarios(){

    let url = URL_SERVICIOS + '/cliente';

    return this.http.get(url);
  }
  cargarEstado(_id:any){
    let url = URL_SERVICIOS + '/cliente/estadoACT/' + _id;
    return this.http.get(url);
  }


  buscarClientes( termino : string ){
  let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get(url).pipe(map((resp:any)=> resp.clientes));
  }

  editarCliente( cliente : Cliente ){
    let url = URL_SERVICIOS + '/cliente/' + cliente._id;
      return this.http.put(url , cliente).pipe(map((resp:any)=>{
        swal('Cliente Actualizado',  'success' );
        resp.clientes;
      }));
    }
    editarestadoCliente( estadoCliente : Estado , _id : any ){
      let url = URL_SERVICIOS + '/cliente/actualizarEstado/' + _id;
        return this.http.put(url , estadoCliente).pipe(map((resp:any)=>{
          swal('Cliente Actualizado','Se actualizo el estado del cliente' , 'success' );
          resp.clientes;
        }));
      }

}
