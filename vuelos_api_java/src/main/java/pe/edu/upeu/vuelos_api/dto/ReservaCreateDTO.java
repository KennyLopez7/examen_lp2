package pe.edu.upeu.vuelos_api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ReservaCreateDTO(
        @NotNull(message = "El id de vuelo es obligatorio") Long vuelo,
        @NotNull
        @Size(min = 1, message = "Debe haber al menos 1 pasajero")
        @Valid List<PasajeroCreateDTO> pasajeros
) {}
