import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray, FormBuilder, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { VueloService } from '../../core/services/vuelo.service';
import { EquipajeService } from '../../core/services/equipaje.service';
import { ReservaService } from '../../core/services/reserva.service';

import { Vuelo } from '../../core/models/vuelo.model';
import { Equipaje } from '../../core/models/equipaje.model';
import { ReservaCreate } from '../../core/models/reserva.model';

import { MonedaPipe } from '../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-nueva-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MonedaPipe],
  template: `
    <div class="mb-6 flex items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Nueva reserva</h1>
        <p class="text-sm text-slate-500 mt-1">Completa los datos del vuelo, los pasajeros y su equipaje.</p>
      </div>
      <a routerLink="/reservas" class="btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Volver
      </a>
    </div>

    <form [formGroup]="form" (ngSubmit)="enviar()" class="space-y-5">
      <div class="bg-white border border-slate-200 rounded-xl p-5">
        <header class="flex items-center gap-2 mb-4">
          <span class="w-7 h-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          <h2 class="font-semibold text-slate-800">Selecciona el vuelo</h2>
        </header>
        <select formControlName="vuelo" class="input">
          <option [ngValue]="null">— Selecciona un vuelo —</option>
          @for (v of vuelos(); track v.id) {
            <option [ngValue]="v.id">
              {{ v.numero }} · {{ v.origen }} → {{ v.destino }} · {{ v.precio | moneda }}
            </option>
          }
        </select>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-5" formArrayName="pasajeros">
        <header class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h2 class="font-semibold text-slate-800">Pasajeros ({{ pasajeros.length }})</h2>
          </div>
          <button type="button" (click)="addPasajero()" class="btn-secondary !py-1.5 !px-3 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Pasajero
          </button>
        </header>

        <div class="space-y-3">
          @for (p of pasajeros.controls; track $index; let pi = $index) {
            <fieldset [formGroupName]="pi" class="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase text-slate-500 tracking-wide">Pasajero {{ pi + 1 }}</span>
                @if (pasajeros.length > 1) {
                  <button type="button" (click)="removePasajero(pi)" class="text-xs text-rose-600 hover:text-rose-800 inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                    Quitar
                  </button>
                }
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="label">Nombre completo</label>
                  <input formControlName="nombre" class="input" placeholder="Juan Perez" />
                </div>
                <div>
                  <label class="label">Documento</label>
                  <input formControlName="documento" class="input" placeholder="12345678" />
                </div>
              </div>

              <div formArrayName="equipaje" class="mt-4">
                <header class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold uppercase text-slate-500 tracking-wide">Equipaje</span>
                  <button type="button" (click)="addEquipaje(pi)" class="text-xs text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Agregar
                  </button>
                </header>

                @if (getEquipaje(pi).length === 0) {
                  <p class="text-xs text-slate-400 italic">Sin equipaje (opcional).</p>
                }

                @for (eq of getEquipaje(pi).controls; track $index; let ei = $index) {
                  <div [formGroupName]="ei" class="flex items-center gap-2 mb-2">
                    <select formControlName="equipaje" class="input flex-1">
                      <option [ngValue]="null">— Tipo de equipaje —</option>
                      @for (e of equipajes(); track e.id) {
                        <option [ngValue]="e.id">{{ e.tamano }} ({{ e.costo | moneda }})</option>
                      }
                    </select>
                    <input type="number" min="1" formControlName="cantidad"
                           class="input !w-20" placeholder="1" />
                    <button type="button" (click)="removeEquipaje(pi, ei)"
                            class="w-9 h-9 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                }
              </div>
            </fieldset>
          }
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between sticky bottom-4 shadow-md z-10">
        <div>
          <p class="text-xs text-slate-500 uppercase tracking-wide">Total estimado</p>
          <p class="text-2xl font-bold text-slate-800">{{ total() | moneda }}</p>
        </div>

        <div class="flex items-center gap-3">
          @if (error()) {
            <div class="bg-rose-50 text-rose-700 px-3 py-2 rounded-lg text-xs ring-1 ring-rose-200 max-w-xs">{{ error() }}</div>
          }
          <button type="submit" [disabled]="enviando()" class="btn-primary !py-2.5 !px-5">
            @if (enviando()) {
              <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
              </svg>
              Guardando…
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              Crear reserva
            }
          </button>
        </div>
      </div>
    </form>
  `,
})
export class NuevaReservaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private vueloSvc = inject(VueloService);
  private equipajeSvc = inject(EquipajeService);
  private reservaSvc = inject(ReservaService);
  private router = inject(Router);

  vuelos = signal<Vuelo[]>([]);
  equipajes = signal<Equipaje[]>([]);
  enviando = signal(false);
  error = signal<string>('');
  recomputeTrigger = signal(0);

  form: FormGroup = this.fb.group({
    vuelo: this.fb.control<number | null>(null, Validators.required),
    pasajeros: this.fb.array([this.crearPasajero()]),
  });

  total = computed(() => {
    this.recomputeTrigger();
    const vueloId = this.form.value.vuelo;
    const vuelo = this.vuelos().find(v => v.id === vueloId);
    if (!vuelo) return 0;

    const precio = parseFloat(vuelo.precio);
    const equipajes = this.equipajes();
    let total = precio * this.pasajeros.length;

    for (const p of this.pasajeros.controls) {
      const eqs = (p.get('equipaje') as FormArray).controls;
      for (const eq of eqs) {
        const id = eq.value.equipaje;
        const cant = eq.value.cantidad ?? 0;
        const item = equipajes.find(e => e.id === id);
        if (item) total += parseFloat(item.costo) * cant;
      }
    }
    return total;
  });

  get pasajeros(): FormArray { return this.form.get('pasajeros') as FormArray; }

  getEquipaje(i: number): FormArray {
    return this.pasajeros.at(i).get('equipaje') as FormArray;
  }

  ngOnInit() {
    this.vueloSvc.listar().subscribe(v => this.vuelos.set(v));
    this.equipajeSvc.listar().subscribe(e => this.equipajes.set(e));
    this.form.valueChanges.subscribe(() =>
      this.recomputeTrigger.update(n => n + 1)
    );
  }

  crearPasajero(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      equipaje: this.fb.array([]),
    });
  }

  addPasajero() {
    this.pasajeros.push(this.crearPasajero());
    this.recomputeTrigger.update(n => n + 1);
  }

  removePasajero(i: number) {
    this.pasajeros.removeAt(i);
    this.recomputeTrigger.update(n => n + 1);
  }

  addEquipaje(pi: number) {
    this.getEquipaje(pi).push(this.fb.group({
      equipaje: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    }));
    this.recomputeTrigger.update(n => n + 1);
  }

  removeEquipaje(pi: number, ei: number) {
    this.getEquipaje(pi).removeAt(ei);
    this.recomputeTrigger.update(n => n + 1);
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set(this.describirInvalido());
      return;
    }
    this.enviando.set(true);
    this.error.set('');

    const payload = this.form.getRawValue() as ReservaCreate;
    console.log('[nueva-reserva] POST payload =', payload);

    this.reservaSvc.crear(payload).subscribe({
      next: r => {
        console.log('[nueva-reserva] reserva creada =', r);
        this.router.navigate(['/reservas']);
      },
      error: e => {
        console.error('[nueva-reserva] error =', e);
        const status = e?.status ? `[${e.status}] ` : '';
        const msg = e?.detail ?? e?.message ?? 'Error creando reserva';
        this.error.set(`${status}${msg}`);
        this.enviando.set(false);
      },
    });
  }

  private describirInvalido(): string {
    if (!this.form.value.vuelo) return 'Selecciona un vuelo.';
    for (let i = 0; i < this.pasajeros.length; i++) {
      const p = this.pasajeros.at(i);
      if (p.get('nombre')?.invalid) return `Pasajero ${i + 1}: falta nombre.`;
      if (p.get('documento')?.invalid) return `Pasajero ${i + 1}: falta documento.`;
      const eqs = this.getEquipaje(i);
      for (let j = 0; j < eqs.length; j++) {
        const eq = eqs.at(j);
        if (eq.get('equipaje')?.invalid) return `Pasajero ${i + 1}, equipaje ${j + 1}: selecciona el tipo.`;
        if (eq.get('cantidad')?.invalid) return `Pasajero ${i + 1}, equipaje ${j + 1}: cantidad inválida.`;
      }
    }
    return 'Formulario incompleto.';
  }
}
