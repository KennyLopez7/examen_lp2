import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipaje } from '../models/equipaje.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EquipajeService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/equipajes/`;

  listar(): Observable<Equipaje[]> {
    return this.http.get<Equipaje[]>(this.base);
  }
}
