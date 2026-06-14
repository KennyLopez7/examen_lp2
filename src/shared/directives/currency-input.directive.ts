import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[appCurrencyInput]', standalone: true })
export class CurrencyInputDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input') onInput() {
    const input = this.el.nativeElement;
    input.value = input.value.replace(/[^0-9.]/g, '');
  }
}
