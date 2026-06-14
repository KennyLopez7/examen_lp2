import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VueloService } from '../../core/services/vuelo.service';
import { ReservaService } from '../../core/services/reserva.service';
import { EquipajeService } from '../../core/services/equipaje.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
      <p class="text-sm text-slate-500 mt-1">Resumen general del sistema de reservas.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Vuelos</span>
          <div class="w-9 h-9 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-slate-800 leading-none">{{ totalVuelos() }}</p>
        <a routerLink="/vuelos" class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-xs font-medium mt-3">
          Ver todos
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Reservas</span>
          <div class="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-slate-800 leading-none">{{ totalReservas() }}</p>
        <a routerLink="/reservas" class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-xs font-medium mt-3">
          Ver todas
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Tipos de equipaje</span>
          <div class="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" /></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-slate-800 leading-none">{{ totalEquipajes() }}</p>
        <a routerLink="/equipajes" class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-xs font-medium mt-3">
          Ver catálogo
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5">
      <h2 class="text-base font-semibold text-slate-800 mb-1">Acciones rápidas</h2>
      <p class="text-xs text-slate-500 mb-4">Operaciones frecuentes con un solo click.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a routerLink="/reservas/nueva"
           class="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-colors group">
          <div class="w-10 h-10 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-800 text-sm">Nueva reserva</p>
            <p class="text-xs text-slate-500">Crear una reserva con pasajeros y equipaje</p>
          </div>
        </a>

        <a routerLink="/reservas/buscar"
           class="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors group">
          <div class="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-700 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-800 text-sm">Buscar reserva</p>
            <p class="text-xs text-slate-500">Por documento + número de vuelo</p>
          </div>
        </a>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private vueloSvc = inject(VueloService);
  private reservaSvc = inject(ReservaService);
  private equipajeSvc = inject(EquipajeService);

  totalVuelos = signal(0);
  totalReservas = signal(0);
  totalEquipajes = signal(0);

  ngOnInit() {
    this.vueloSvc.listar().subscribe(v => this.totalVuelos.set(v.length));
    this.reservaSvc.listar().subscribe(r => this.totalReservas.set(r.length));
    this.equipajeSvc.listar().subscribe(e => this.totalEquipajes.set(e.length));
  }
}
