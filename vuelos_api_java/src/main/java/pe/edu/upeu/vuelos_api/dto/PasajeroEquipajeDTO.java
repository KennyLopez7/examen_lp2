package pe.edu.upeu.vuelos_api.dto;

import java.math.BigDecimal;

public record PasajeroEquipajeDTO(
        Long id,
        EquipajeDTO equipaje,
        Integer cantidad,
        BigDecimal subtotal
) {}
