package pe.edu.upeu.vuelos_api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pe.edu.upeu.vuelos_api.dto.VueloDTO;
import pe.edu.upeu.vuelos_api.enums.OrdenVuelo;
import pe.edu.upeu.vuelos_api.mapper.VueloMapper;
import pe.edu.upeu.vuelos_api.repository.VueloRepository;
import pe.edu.upeu.vuelos_api.service.VueloService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VueloServiceImpl implements VueloService {

    private final VueloRepository repo;
    private final VueloMapper mapper;

    @Override
    public List<VueloDTO> listar(String order) {
        Sort sort = switch (OrdenVuelo.fromParam(order)) {
            case FECHA  -> Sort.by("fechaSalida").ascending();
            case NUMERO -> Sort.by("numero").ascending();
        };
        return repo.findAll(sort).stream().map(mapper::toDto).toList();
    }
}
