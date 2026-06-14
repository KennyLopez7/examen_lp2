package pe.edu.upeu.vuelos_api.mapper;

import org.mapstruct.Mapper;
import pe.edu.upeu.vuelos_api.dto.VueloDTO;
import pe.edu.upeu.vuelos_api.entity.Vuelo;

@Mapper(componentModel = "spring")
public interface VueloMapper {
    VueloDTO toDto(Vuelo vuelo);
}
