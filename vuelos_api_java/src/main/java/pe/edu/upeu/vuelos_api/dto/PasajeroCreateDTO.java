package pe.edu.upeu.vuelos_api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record PasajeroCreateDTO(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "El documento es obligatorio") String documento,
        @Valid List<PasajeroEquipajeCreateDTO> equipaje
) {}
