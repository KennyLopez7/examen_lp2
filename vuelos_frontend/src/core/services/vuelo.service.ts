import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VueloService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/vuelos/`;

  listar(order: 'numero' | 'fecha' = 'numero'): Observable<Vuelo[]> {
    const params = new HttpParams().set('order', order);
    return this.http.get<Vuelo[]>(this.base, { params });
  }
}
