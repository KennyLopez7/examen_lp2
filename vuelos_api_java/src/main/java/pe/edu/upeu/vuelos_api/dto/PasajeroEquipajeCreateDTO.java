package pe.edu.upeu.vuelos_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PasajeroEquipajeCreateDTO(
        @NotNull(message = "El id de equipaje es obligatorio") Long equipaje,
        @NotNull @Min(value = 1, message = "La cantidad mínima es 1") Integer cantidad
) {}
