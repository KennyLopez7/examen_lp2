import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva.model';
import { LoadingComponent } from '../../shared/components/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { MonedaPipe } from '../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule, DatePipe, RouterLink,
    LoadingComponent, EmptyStateComponent, MonedaPipe,
  ],
  template: `
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Reservas</h1>
        <p class="text-sm text-slate-500 mt-1">Listado completo de reservas registradas.</p>
      </div>

      <a routerLink="/reservas/nueva" class="btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        Nueva reserva
      </a>
    </div>

    @if (loading()) {
      <div class="bg-white rounded-xl border border-slate-200">
        <app-loading message="Cargando reservas…" />
      </div>
    } @else if (reservas().length === 0) {
      <div class="bg-white rounded-xl border border-slate-200">
        <app-empty-state message="Aún no hay reservas" hint="Crea la primera desde el botón de arriba." />
      </div>
    } @else {
      <div class="space-y-4">
        @for (r of reservas(); track r.id) {
          <article class="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <header class="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
              <div class="flex items-center gap-3">
                <span class="badge bg-sky-100 text-sky-800 ring-1 ring-sky-200 text-sm">#{{ r.id }}</span>
                <div>
                  <p class="text-xs text-slate-500">Vuelo</p>
                  <p class="font-semibold text-slate-800 text-sm">
                    <span class="font-mono">{{ r.vuelo.numero }}</span>
                    <span class="text-slate-400 mx-1">·</span>
                    {{ r.vuelo.origen }} → {{ r.vuelo.destino }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-500">Creado</p>
                <p class="text-xs font-medium text-slate-700">{{ r.creado | date:'short' }}</p>
              </div>
            </header>

            <div class="p-5">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Pasajeros ({{ r.pasajeros.length }})
              </p>

              <div class="space-y-2 mb-4">
                @for (p of r.pasajeros; track p.id) {
                  <div class="flex items-start gap-3 p-3 bg-slate-50/60 rounded-lg">
                    <div class="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {{ p.nombre.charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-slate-800 text-sm">{{ p.nombre }}</p>
                      <p class="text-xs text-slate-500">DNI: {{ p.documento }}</p>
                      @if (p.equipaje.length) {
                        <div class="mt-1.5 flex flex-wrap gap-1">
                          @for (eq of p.equipaje; track eq.id) {
                            <span class="badge bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                              {{ eq.cantidad }}× {{ eq.equipaje.tamano }}
                            </span>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>

              <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span class="text-sm text-slate-500">Total reserva</span>
                <span class="text-lg font-bold text-slate-800">{{ r.total | moneda }}</span>
              </div>
            </div>
          </article>
        }
      </div>
    }
  `,
})
export class ReservasComponent implements OnInit {
  private svc = inject(ReservaService);

  reservas = signal<Reserva[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.svc.listar().subscribe({
      next: d => { this.reservas.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
