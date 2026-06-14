package pe.edu.upeu.vuelos_api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.vuelos_api.dto.VueloDTO;
import pe.edu.upeu.vuelos_api.service.VueloService;

import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
@RequiredArgsConstructor
public class VueloController {

    private final VueloService service;

    @GetMapping
    public List<VueloDTO> listar(
            @RequestParam(value = "order", required = false, defaultValue = "numero") String order) {
        return service.listar(order);
    }
}
