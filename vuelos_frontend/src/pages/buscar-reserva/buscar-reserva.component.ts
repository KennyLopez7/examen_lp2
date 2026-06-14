import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva.model';
import { MonedaPipe } from '../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-buscar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, MonedaPipe],
  template: `
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Buscar reserva</h1>
      <p class="text-sm text-slate-500 mt-1">Ingresa el documento del pasajero y el número de vuelo.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 mb-5">
      <form (ngSubmit)="buscar()" class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div class="md:col-span-1">
          <label class="label">Documento</label>
          <input [(ngModel)]="documento" name="documento" required class="input" placeholder="12345678" />
        </div>
        <div class="md:col-span-1">
          <label class="label">N° Vuelo</label>
          <input [(ngModel)]="numeroVuelo" name="numero" required class="input" placeholder="LA2034" />
        </div>
        <div class="md:col-span-1">
          <label class="label">Método</label>
          <select [(ngModel)]="metodo" name="metodo" class="input">
            <option value="POST">POST (body)</option>
            <option value="GET">GET (query)</option>
          </select>
        </div>
        <div class="md:col-span-1 flex items-end">
          <button class="btn-primary w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            Buscar
          </button>
        </div>
      </form>
    </div>

    @if (error()) {
      <div class="bg-rose-50 text-rose-700 px-4 py-3 rounded-lg text-sm ring-1 ring-rose-200 mb-4 flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0 mt-0.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
        <span>{{ error() }}</span>
      </div>
    }

    @if (reserva(); as r) {
      <article class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <header class="px-5 py-4 bg-gradient-to-r from-emerald-50 to-sky-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Reserva encontrada</p>
              <p class="font-bold text-slate-800">#{{ r.id }}</p>
            </div>
          </div>
          <span class="text-xs text-slate-500">{{ r.creado | date:'short' }}</span>
        </header>

        <div class="p-5 space-y-4">
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-1">Vuelo</p>
            <p class="font-medium text-slate-800">
              <span class="font-mono text-sky-700">{{ r.vuelo.numero }}</span>
              <span class="text-slate-400 mx-2">·</span>
              {{ r.vuelo.origen }} → {{ r.vuelo.destino }}
            </p>
          </div>

          <div>
            <p class="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-2">
              Pasajeros ({{ r.pasajeros.length }})
            </p>
            <ul class="space-y-1.5">
              @for (p of r.pasajeros; track p.id) {
                <li class="flex items-center gap-2 text-sm">
                  <span class="w-7 h-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {{ p.nombre.charAt(0).toUpperCase() }}
                  </span>
                  <span class="font-medium text-slate-800">{{ p.nombre }}</span>
                  <span class="text-slate-500 text-xs">({{ p.documento }})</span>
                </li>
              }
            </ul>
          </div>

          <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span class="text-sm text-slate-500">Total</span>
            <span class="text-xl font-bold text-slate-800">{{ r.total | moneda }}</span>
          </div>
        </div>
      </article>
    }
  `,
})
export class BuscarReservaComponent {
  private svc = inject(ReservaService);

  documento = '';
  numeroVuelo = '';
  metodo: 'GET' | 'POST' = 'POST';
  reserva = signal<Reserva | null>(null);
  error = signal<string>('');

  buscar() {
    this.error.set('');
    this.reserva.set(null);

    const obs = this.metodo === 'POST'
      ? this.svc.buscarPost(this.documento, this.numeroVuelo)
      : this.svc.buscar(this.documento, this.numeroVuelo);

    obs.subscribe({
      next: r => this.reserva.set(r),
      error: e => this.error.set(e.detail ?? 'No se encontró la reserva'),
    });
  }
}
