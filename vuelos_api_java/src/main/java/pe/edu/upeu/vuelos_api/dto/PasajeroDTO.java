package pe.edu.upeu.vuelos_api.dto;

import java.util.List;

public record PasajeroDTO(
        Long id,
        String nombre,
        String documento,
        List<PasajeroEquipajeDTO> equipaje
) {}
