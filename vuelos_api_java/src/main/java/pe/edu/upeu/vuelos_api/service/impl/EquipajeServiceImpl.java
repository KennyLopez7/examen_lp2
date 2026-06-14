package pe.edu.upeu.vuelos_api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pe.edu.upeu.vuelos_api.dto.EquipajeDTO;
import pe.edu.upeu.vuelos_api.mapper.EquipajeMapper;
import pe.edu.upeu.vuelos_api.repository.EquipajeRepository;
import pe.edu.upeu.vuelos_api.service.EquipajeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipajeServiceImpl implements EquipajeService {

    private final EquipajeRepository repo;
    private final EquipajeMapper mapper;

    @Override
    public List<EquipajeDTO> listar() {
        return repo.findAll(Sort.by("id")).stream().map(mapper::toDto).toList();
    }
}
