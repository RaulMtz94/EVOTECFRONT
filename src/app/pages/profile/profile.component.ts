import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario : Usuario;
  cliente : Cliente;
  estado : any;
  selectedFile: File;
  constructor(public _sidebar : SidebarService,
    public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cliente = this._usuarioService.cliente;
    //this.estado = this._usuarioService.estado;
   this.estado = this._usuarioService.getestadoCliente()
    .subscribe(res => {
      if(res['estado'][0]){
        this.estado = res['estado'][0];
      }
      return true;
    });
  }

  onFileChanged(event) {
    if( !event){
      this.selectedFile = null;
      return;
    }
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // upload code goes here
    console.log(this.selectedFile);
    this._usuarioService.cambiarImagen(this.selectedFile , this.usuario._id);
  }

  
}
