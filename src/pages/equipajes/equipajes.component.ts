import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipajeService } from '../../core/services/equipaje.service';
import { Equipaje } from '../../core/models/equipaje.model';
import { LoadingComponent } from '../../shared/components/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { MonedaPipe } from '../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-equipajes',
  standalone: true,
  imports: [CommonModule, LoadingComponent, EmptyStateComponent, MonedaPipe],
  template: `
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Equipajes</h1>
      <p class="text-sm text-slate-500 mt-1">Catálogo de tipos de equipaje y su costo.</p>
    </div>

    @if (loading()) {
      <div class="bg-white rounded-xl border border-slate-200">
        <app-loading message="Cargando catálogo…" />
      </div>
    } @else if (equipajes().length === 0) {
      <div class="bg-white rounded-xl border border-slate-200">
        <app-empty-state message="No hay equipajes disponibles" />
      </div>
    } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (e of equipajes(); track e.id) {
          <div class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-amber-300 transition-all">
            <div class="flex items-start justify-between mb-3">
              <div class="w-11 h-11 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" /></svg>
              </div>
              <span class="badge bg-slate-100 text-slate-600 text-[10px]">ID #{{ e.id }}</span>
            </div>
            <h3 class="font-semibold text-slate-800 text-sm leading-tight">{{ e.tamano }}</h3>
            <div class="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <span class="text-xs text-slate-500">Costo unitario</span>
              <span class="text-lg font-bold text-slate-800">{{ e.costo | moneda }}</span>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class EquipajesComponent implements OnInit {
  private svc = inject(EquipajeService);
  equipajes = signal<Equipaje[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.svc.listar().subscribe({
      next: d => { this.equipajes.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
