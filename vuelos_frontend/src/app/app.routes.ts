import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'vuelos',
        loadComponent: () =>
          import('../pages/vuelos/vuelos.component').then(m => m.VuelosComponent),
      },
      {
        path: 'equipajes',
        loadComponent: () =>
          import('../pages/equipajes/equipajes.component').then(m => m.EquipajesComponent),
      },
      {
        path: 'reservas',
        loadComponent: () =>
          import('../pages/reservas/reservas.component').then(m => m.ReservasComponent),
      },
      {
        path: 'reservas/nueva',
        loadComponent: () =>
          import('../pages/nueva-reserva/nueva-reserva.component').then(m => m.NuevaReservaComponent),
      },
      {
        path: 'reservas/buscar',
        loadComponent: () =>
          import('../pages/buscar-reserva/buscar-reserva.component').then(m => m.BuscarReservaComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
