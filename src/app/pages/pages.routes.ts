import { RouterModule , Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from '../services/service.index';
import { AddclienteComponent } from './addcliente/addcliente.component';
import { InfocuotasComponent } from './infocuotas/infocuotas.component';
import { EstadoComponent } from './estado/estado.component';
import { RenovacionesComponent } from './renovaciones/renovaciones.component';
import { RutinasClienteComponent } from './rutinas-cliente/rutinas-cliente.component';
import { ProgresoClienteComponent } from './progreso-cliente/progreso-cliente.component';
import { DietasClienteComponent } from './dietas-cliente/dietas-cliente.component';
import { ForoClienteComponent } from './foro-cliente/foro-cliente.component';
import { InfoInstructoresComponent } from './info-instructores/info-instructores.component';
import { InfoPromocionesComponent } from './info-promociones/info-promociones.component';
import { HcocompraComponent } from './hcocompra/hcocompra.component';
import { AdminGuard } from '../services/service.index';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';
import { HistoricoComponent } from './historico/historico.component';
import { DietasComponent } from './dietas/dietas.component';
import { AsignarDietaComponent } from './asignar-dieta/asignar-dieta.component';
import { RutinasComponent } from './rutinas/rutinas.component';


const pagesRoutes: Routes = [
    {  
        path:'', 
        component:PagesComponent,
        canActivate: [LoginGuardGuard],
        children:[
            {path:'dashboard', component:DashboardComponent, data: { titulo : 'Dashboard'} },
            {path:'progress', component:ProgressComponent, data: { titulo : 'Progress'} },
            {path:'graficas1', component:Graficas1Component, data: { titulo : 'Graficas'} },
            {path:'promesas', component:PromesasComponent, data: { titulo : 'Promesas'} },
            {path:'rxjs', component:RxjsComponent, data: { titulo : 'RxJs'} },
            {path:'Profile', component:ProfileComponent, data: { titulo : 'Perfil'} },
            {path:'Historico', component:HcocompraComponent, data: { titulo : 'Historico compras'} },

            {path:'account-settings', component:AccountSettingsComponent, data: { titulo : 'Ajustes de tema'} },
            {path:'clientes', component:AddclienteComponent,canActivate : [AdminGuard], data: { titulo : 'CRUD Clientes'} },
            {path:'infoCuotas', component:InfocuotasComponent, data: { titulo : 'Info. Cuotas'} },
            {path:'estado', component:EstadoComponent, data: { titulo : 'Estado Cliente'} },
            {path:'renovacion', component:RenovacionesComponent, data: { titulo : 'Renovacion'} },
            {path:'Dietas', component:DietasClienteComponent, data: { titulo : 'Dietas'} },
            {path:'Rutinas', component:RutinasClienteComponent, data: { titulo : 'Rutinas'} },
            {path:'Progreso', component:ProgresoClienteComponent, data: { titulo : 'Progreso'} },
            {path:'Foro', component:ForoClienteComponent, data: { titulo : 'Foro de discusion'} },
            {path:'Instructores', component:InfoInstructoresComponent, data: { titulo : 'Instructores y clases'} },
            {path:'Promociones', component:InfoPromocionesComponent, data: { titulo : 'Promociones'} },
            {path:'seguimiento', component:SeguimientoComponent, data : {titulo : 'Seguimiento'}},
            {path:'hco_visitas', component:RegistroVisitaComponent, data : {titulo : 'Registro visitas'}},
            {path:'historico', component:HistoricoComponent, data : {titulo : 'Historico Visitas'}},
            {path:'dietas', component:DietasComponent, data : {titulo : 'Dietas'}},
            {path:'asignarDieta', component:AsignarDietaComponent, data : {titulo : 'Asignar Dieta'}},
            {path:'rutinas', component:RutinasComponent, data : {titulo : 'Rutinas'}},

            






            {path:'', redirectTo: '/dashboard', pathMatch:'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);