import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva, ReservaCreate } from '../models/reserva.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/reservas/`;

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.base);
  }

  crear(payload: ReservaCreate): Observable<Reserva> {
    return this.http.post<Reserva>(this.base, payload);
  }

  buscar(documento: string, numeroVuelo: string): Observable<Reserva> {
    const params = new HttpParams()
      .set('documento', documento)
      .set('numero_vuelo', numeroVuelo);
    return this.http.get<Reserva>(`${this.base}buscar/`, { params });
  }

  buscarPost(documento: string, numeroVuelo: string): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.base}buscar-post/`, {
      documento,
      numero_vuelo: numeroVuelo,
    });
  }
}
