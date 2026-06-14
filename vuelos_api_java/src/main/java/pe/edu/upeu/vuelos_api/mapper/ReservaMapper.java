package pe.edu.upeu.vuelos_api.mapper;

import org.mapstruct.Mapper;
import pe.edu.upeu.vuelos_api.dto.PasajeroDTO;
import pe.edu.upeu.vuelos_api.dto.PasajeroEquipajeDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaDTO;
import pe.edu.upeu.vuelos_api.entity.Pasajero;
import pe.edu.upeu.vuelos_api.entity.PasajeroEquipaje;
import pe.edu.upeu.vuelos_api.entity.Reserva;

@Mapper(componentModel = "spring", uses = {VueloMapper.class, EquipajeMapper.class})
public interface ReservaMapper {

    ReservaDTO toDto(Reserva reserva);

    PasajeroDTO toDto(Pasajero pasajero);

    PasajeroEquipajeDTO toDto(PasajeroEquipaje pe);
}
