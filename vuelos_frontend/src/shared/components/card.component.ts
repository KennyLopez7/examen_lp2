import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
      @if (title || subtitle) {
        <header class="px-5 pt-5 pb-3 border-b border-slate-100">
          @if (title) {
            <h2 class="text-base font-semibold text-slate-800 leading-tight">{{ title }}</h2>
          }
          @if (subtitle) {
            <p class="text-xs text-slate-500 mt-0.5">{{ subtitle }}</p>
          }
        </header>
      }
      <div class="p-5">
        <ng-content />
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
