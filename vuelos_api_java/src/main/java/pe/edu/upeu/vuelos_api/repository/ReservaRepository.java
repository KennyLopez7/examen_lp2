package pe.edu.upeu.vuelos_api.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.vuelos_api.entity.Reserva;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("""
           select distinct r from Reserva r
             join fetch r.vuelo v
             join r.pasajeros p
            where v.numero = :numeroVuelo
              and p.documento = :documento
            order by r.creado desc
           """)
    List<Reserva> buscarPorDocumentoYVuelo(@Param("documento") String documento,
                                           @Param("numeroVuelo") String numeroVuelo,
                                           Pageable pageable);
}
