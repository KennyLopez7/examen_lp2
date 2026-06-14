import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="w-64 bg-slate-900 text-slate-100 min-h-full flex flex-col border-r border-slate-800">
      <div class="p-4">
        <p class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2 px-3">Navegación</p>

        <nav class="flex flex-col gap-0.5 text-sm">
          <a routerLink="/dashboard" routerLinkActive="active-link"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12 12 2.25 21.75 12M4.5 9.75v10.125a1.125 1.125 0 0 0 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125a1.125 1.125 0 0 0 1.125-1.125V9.75" /></svg>
            <span>Dashboard</span>
          </a>

          <a routerLink="/vuelos" routerLinkActive="active-link"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
            <span>Vuelos</span>
          </a>

          <a routerLink="/equipajes" routerLinkActive="active-link"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" /></svg>
            <span>Equipajes</span>
          </a>

          <a routerLink="/reservas" routerLinkActive="active-link"
             [routerLinkActiveOptions]="{ exact: true }"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
            <span>Reservas</span>
          </a>
        </nav>

        <p class="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-6 mb-2 px-3">Acciones</p>

        <nav class="flex flex-col gap-0.5 text-sm">
          <a routerLink="/reservas/nueva" routerLinkActive="active-link"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            <span>Nueva reserva</span>
          </a>

          <a routerLink="/reservas/buscar" routerLinkActive="active-link"
             class="nav-link group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <span>Buscar reserva</span>
          </a>
        </nav>
      </div>

      <div class="mt-auto p-4">
        <div class="bg-slate-800/60 rounded-lg p-3 text-xs text-slate-400 ring-1 ring-slate-700/50">
          <p class="text-slate-200 font-semibold mb-0.5">¿Necesitas ayuda?</p>
          <p class="text-[11px] leading-snug">Revisa la documentación de la API en GitHub.</p>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .nav-link {
      @apply flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-150;
    }
    .active-link {
      @apply bg-sky-600/15 text-sky-300 font-medium ring-1 ring-sky-500/20;
    }
    .active-link svg { @apply text-sky-400; }
  `],
})
export class SidebarComponent {}
