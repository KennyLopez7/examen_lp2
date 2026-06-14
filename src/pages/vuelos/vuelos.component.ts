import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VueloService } from '../../core/services/vuelo.service';
import { Vuelo } from '../../core/models/vuelo.model';
import { CardComponent } from '../../shared/components/card.component';
import { LoadingComponent } from '../../shared/components/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { MonedaPipe } from '../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DatePipe,
    CardComponent, LoadingComponent, EmptyStateComponent, MonedaPipe,
  ],
  template: `
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Vuelos</h1>
        <p class="text-sm text-slate-500 mt-1">Catálogo de vuelos disponibles.</p>
      </div>

      <div class="flex items-center gap-2">
        <label class="label !mb-0 mr-1">Ordenar por:</label>
        <select [(ngModel)]="order" (ngModelChange)="cargar()" class="input !w-auto py-1.5">
          <option value="numero">Número</option>
          <option value="fecha">Fecha de salida</option>
        </select>
      </div>
    </div>

    <app-card>
      @if (loading()) {
        <app-loading message="Cargando vuelos…" />
      } @else if (vuelos().length === 0) {
        <app-empty-state message="No hay vuelos disponibles" hint="Vuelve a intentarlo más tarde." />
      } @else {
        <div class="overflow-x-auto -mx-5 -my-5">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-slate-500 text-left text-xs uppercase tracking-wider">
                <th class="px-5 py-3 font-semibold">N°</th>
                <th class="px-5 py-3 font-semibold">Origen</th>
                <th class="px-5 py-3 font-semibold">Destino</th>
                <th class="px-5 py-3 font-semibold">Salida</th>
                <th class="px-5 py-3 font-semibold">Llegada</th>
                <th class="px-5 py-3 font-semibold text-right">Precio</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (v of vuelos(); track v.id) {
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="px-5 py-3">
                    <span class="badge bg-sky-50 text-sky-700 ring-1 ring-sky-200 font-mono">{{ v.numero }}</span>
                  </td>
                  <td class="px-5 py-3 font-medium text-slate-700">{{ v.origen }}</td>
                  <td class="px-5 py-3">
                    <span class="inline-flex items-center gap-1.5 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-slate-400"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                      {{ v.destino }}
                    </span>
                  </td>
                  <td class="px-5 py-3 text-slate-600">{{ v.fecha_salida | date:'short' }}</td>
                  <td class="px-5 py-3 text-slate-600">{{ v.fecha_llegada | date:'short' }}</td>
                  <td class="px-5 py-3 text-right font-semibold text-slate-800">{{ v.precio | moneda }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </app-card>
  `,
})
export class VuelosComponent implements OnInit {
  private svc = inject(VueloService);

  vuelos = signal<Vuelo[]>([]);
  loading = signal(true);
  order: 'numero' | 'fecha' = 'numero';

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.svc.listar(this.order).subscribe({
      next: data => { this.vuelos.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
