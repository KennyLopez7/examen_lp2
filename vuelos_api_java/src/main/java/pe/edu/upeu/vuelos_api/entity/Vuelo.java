package pe.edu.upeu.vuelos_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "vuelos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Vuelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 20)
    private String numero;

    @Column(nullable = false, length = 80)
    private String origen;

    @Column(nullable = false, length = 80)
    private String destino;

    @Column(name = "fecha_salida", nullable = false)
    private OffsetDateTime fechaSalida;

    @Column(name = "fecha_llegada", nullable = false)
    private OffsetDateTime fechaLlegada;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
}
