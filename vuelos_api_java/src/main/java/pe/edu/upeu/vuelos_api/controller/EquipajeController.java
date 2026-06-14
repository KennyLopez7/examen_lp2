package pe.edu.upeu.vuelos_api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.vuelos_api.dto.EquipajeDTO;
import pe.edu.upeu.vuelos_api.service.EquipajeService;

import java.util.List;

@RestController
@RequestMapping("/api/equipajes")
@RequiredArgsConstructor
public class EquipajeController {

    private final EquipajeService service;

    @GetMapping
    public List<EquipajeDTO> listar() {
        return service.listar();
    }
}
