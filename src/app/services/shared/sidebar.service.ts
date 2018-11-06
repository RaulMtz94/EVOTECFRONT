import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'rxjs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Cuotas y Pagos',
      icono: 'mdi mdi-wallet-membership',
      submenu: [
        { titulo: 'Informacion de cuotas', url: '/InfoCuotas' },
        { titulo: 'Estado de cuenta', url: '/Estado' },
        { titulo: 'Renovaciones', url: '/Renovaciones' }
      ]
    },
    {
      titulo: 'Servicios',
      icono: 'mdi mdi-library-books',
      submenu: [
        { titulo : 'Mis Dietas', url: '/Dietas' },
        { titulo: 'Mis rutinas', url: '/Rutinas' },
        { titulo: 'Mi progreso', url: '/Progreso' }
      ]
    },
    {
      titulo: 'Entretenimiento',
      icono: 'mdi mdi-gamepad-variant',
      submenu: [
        { titulo: 'Foro de discusion', url: '/Foro' }
      ]
    },
    {
      titulo: 'Info. General',
      icono: 'mdi mdi-information-variant',
      submenu: [
        { titulo: 'Instructores y clases', url: '/Info' },
        { titulo : 'Promociones', url: '/Promociones' },
        { titulo : 'Venta de productos', url: '/Ventas' }
      ]
    }
  ];

  constructor() { }

}
