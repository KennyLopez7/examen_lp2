import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-10 text-slate-400">
      <svg class="animate-spin w-8 h-8 text-sky-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
      </svg>
      <span class="text-sm">{{ message }}</span>
    </div>
  `,
})
export class LoadingComponent {
  @Input() message = 'Cargando…';
}
