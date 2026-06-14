package pe.edu.upeu.vuelos_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "equipajes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Equipaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String tamano;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal costo;
}
