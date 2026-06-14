package pe.edu.upeu.vuelos_api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record BuscarReservaDTO(
        @NotBlank(message = "El documento es obligatorio")
        String documento,

        @NotBlank(message = "El numero_vuelo es obligatorio")
        @JsonProperty("numero_vuelo")
        String numeroVuelo
) {}
