package pe.edu.upeu.vuelos_api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.vuelos_api.dto.BuscarReservaDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaCreateDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaDTO;
import pe.edu.upeu.vuelos_api.service.ReservaService;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService service;

    @GetMapping
    public List<ReservaDTO> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<ReservaDTO> crear(@RequestBody @Valid ReservaCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @GetMapping("/buscar")
    public ReservaDTO buscar(@RequestParam("documento") String documento,
                             @RequestParam("numero_vuelo") String numeroVuelo) {
        return service.buscar(documento, numeroVuelo);
    }

    @PostMapping("/buscar-post")
    public ReservaDTO buscarPost(@RequestBody @Valid BuscarReservaDTO dto) {
        return service.buscar(dto.documento(), dto.numeroVuelo());
    }
}
