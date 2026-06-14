package pe.edu.upeu.vuelos_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.vuelos_api.entity.Vuelo;

public interface VueloRepository extends JpaRepository<Vuelo, Long> {
}
