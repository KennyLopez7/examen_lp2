package pe.edu.upeu.vuelos_api.mapper;

import org.mapstruct.Mapper;
import pe.edu.upeu.vuelos_api.dto.EquipajeDTO;
import pe.edu.upeu.vuelos_api.entity.Equipaje;

@Mapper(componentModel = "spring")
public interface EquipajeMapper {
    EquipajeDTO toDto(Equipaje equipaje);
}
