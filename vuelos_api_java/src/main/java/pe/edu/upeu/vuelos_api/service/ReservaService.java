package pe.edu.upeu.vuelos_api.service;

import pe.edu.upeu.vuelos_api.dto.ReservaCreateDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaDTO;

import java.util.List;

public interface ReservaService {

    List<ReservaDTO> listar();

    ReservaDTO crear(ReservaCreateDTO dto);

    ReservaDTO buscar(String documento, String numeroVuelo);
}
