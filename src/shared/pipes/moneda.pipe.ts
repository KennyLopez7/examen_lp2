import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'moneda', standalone: true })
export class MonedaPipe implements PipeTransform {
  transform(value: string | number | null | undefined, currency = 'PEN'): string {
    if (value === null || value === undefined || value === '') return '—';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '—';
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency }).format(num);
  }
}
