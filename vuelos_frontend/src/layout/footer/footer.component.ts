import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
      <span>© {{ year }} <strong class="text-slate-700">Vuelos API</strong></span>
      <span class="flex items-center gap-1.5">
        Hecho con
        <span class="text-rose-500">♥</span>
        · Angular 18 + Django REST
      </span>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
