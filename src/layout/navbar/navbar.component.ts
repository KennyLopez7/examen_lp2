import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header class="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white shadow-md sticky top-0 z-30">
      <div class="px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/15 backdrop-blur rounded-lg flex items-center justify-center ring-1 ring-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M3.05 13.42a.75.75 0 01.93-.5l3.05.87 3.55-3.55-7.13-2.92a.75.75 0 01-.13-1.32l1.42-1a.75.75 0 01.7-.06l9.13 3.74 3.16-3.16a2.25 2.25 0 113.18 3.18l-3.16 3.16 3.74 9.13a.75.75 0 01-.06.7l-1 1.42a.75.75 0 01-1.32-.13l-2.92-7.13-3.55 3.55.87 3.05a.75.75 0 01-.5.93l-1.2.34a.75.75 0 01-.85-.32l-2.04-3.4-3.4-2.04a.75.75 0 01-.32-.85l.34-1.2z" />
            </svg>
          </div>
          <div class="leading-tight">
            <h1 class="text-base font-bold tracking-tight">Vuelos API</h1>
            <p class="text-[11px] text-sky-100/80">Sistema de reservas</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="hidden sm:flex items-center gap-1.5 text-xs text-sky-100/90">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            En línea
          </span>
          <span class="badge bg-white/15 text-white ring-1 ring-white/20">v1.0</span>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {}
