import { Vuelo } from './vuelo.model';
import { Equipaje } from './equipaje.model';

export interface PasajeroEquipaje {
  id: number;
  equipaje: Equipaje;
  cantidad: number;
  subtotal: string;
}

export interface Pasajero {
  id: number;
  nombre: string;
  documento: string;
  equipaje: PasajeroEquipaje[];
}

export interface Reserva {
  id: number;
  vuelo: Vuelo;
  total: string;
  creado: string;
  pasajeros: Pasajero[];
}

export interface PasajeroEquipajeCreate {
  equipaje: number;
  cantidad: number;
}

export interface PasajeroCreate {
  nombre: string;
  documento: string;
  equipaje: PasajeroEquipajeCreate[];
}

export interface ReservaCreate {
  vuelo: number;
  pasajeros: PasajeroCreate[];
}
