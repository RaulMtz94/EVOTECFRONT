import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from '../pipes/pipes.module';
import { AddclienteComponent } from './addcliente/addcliente.component';
import { InfocuotasComponent } from './infocuotas/infocuotas.component';
import { EstadoComponent } from './estado/estado.component';
import { RenovacionesComponent } from './renovaciones/renovaciones.component';
import { DietasClienteComponent } from './dietas-cliente/dietas-cliente.component';
import { RutinasClienteComponent } from './rutinas-cliente/rutinas-cliente.component';
import { ProgresoClienteComponent } from './progreso-cliente/progreso-cliente.component';
import { ForoClienteComponent } from './foro-cliente/foro-cliente.component';
import { InfoInstructoresComponent } from './info-instructores/info-instructores.component';
import { InfoPromocionesComponent } from './info-promociones/info-promociones.component';
import { HcocompraComponent } from './hcocompra/hcocompra.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';
import { HistoricoComponent } from './historico/historico.component';
import { DietasComponent } from './dietas/dietas.component';
import { AsignarDietaComponent } from './asignar-dieta/asignar-dieta.component';
import { RutinasComponent } from './rutinas/rutinas.component';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        AddclienteComponent,
        InfocuotasComponent,
        EstadoComponent,
        RenovacionesComponent,
        DietasClienteComponent,
        RutinasClienteComponent,
        ProgresoClienteComponent,
        ForoClienteComponent,
        InfoInstructoresComponent,
        InfoPromocionesComponent,
        HcocompraComponent,
        SeguimientoComponent,
        RegistroVisitaComponent,
        HistoricoComponent,
        DietasComponent,
        AsignarDietaComponent,
        RutinasComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PagesModule{}