package pe.edu.upeu.vuelos_api.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record ReservaDTO(
        Long id,
        VueloDTO vuelo,
        BigDecimal total,
        OffsetDateTime creado,
        List<PasajeroDTO> pasajeros
) {}
