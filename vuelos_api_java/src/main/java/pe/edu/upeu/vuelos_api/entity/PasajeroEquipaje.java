package pe.edu.upeu.vuelos_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "pasajero_equipajes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PasajeroEquipaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pasajero_id")
    private Pasajero pasajero;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "equipaje_id")
    private Equipaje equipaje;

    @Column(nullable = false)
    @Builder.Default
    private Integer cantidad = 1;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal subtotal = BigDecimal.ZERO;
}
