package pe.edu.upeu.vuelos_api.service;

import pe.edu.upeu.vuelos_api.dto.VueloDTO;

import java.util.List;

public interface VueloService {
    List<VueloDTO> listar(String order);
}
