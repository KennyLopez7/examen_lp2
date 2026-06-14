package pe.edu.upeu.vuelos_api.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record VueloDTO(
        Long id,
        String numero,
        String origen,
        String destino,
        OffsetDateTime fechaSalida,
        OffsetDateTime fechaLlegada,
        BigDecimal precio
) {}
