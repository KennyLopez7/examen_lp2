package pe.edu.upeu.vuelos_api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.vuelos_api.dto.PasajeroCreateDTO;
import pe.edu.upeu.vuelos_api.dto.PasajeroEquipajeCreateDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaCreateDTO;
import pe.edu.upeu.vuelos_api.dto.ReservaDTO;
import pe.edu.upeu.vuelos_api.entity.Equipaje;
import pe.edu.upeu.vuelos_api.entity.Pasajero;
import pe.edu.upeu.vuelos_api.entity.PasajeroEquipaje;
import pe.edu.upeu.vuelos_api.entity.Reserva;
import pe.edu.upeu.vuelos_api.entity.Vuelo;
import pe.edu.upeu.vuelos_api.exception.ResourceNotFoundException;
import pe.edu.upeu.vuelos_api.mapper.ReservaMapper;
import pe.edu.upeu.vuelos_api.repository.EquipajeRepository;
import pe.edu.upeu.vuelos_api.repository.ReservaRepository;
import pe.edu.upeu.vuelos_api.repository.VueloRepository;
import pe.edu.upeu.vuelos_api.service.ReservaService;
import pe.edu.upeu.vuelos_api.util.CalculadoraTotal;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepo;
    private final VueloRepository vueloRepo;
    private final EquipajeRepository equipajeRepo;
    private final ReservaMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<ReservaDTO> listar() {
        return reservaRepo.findAll().stream().map(mapper::toDto).toList();
    }

    @Override
    @Transactional
    public ReservaDTO crear(ReservaCreateDTO dto) {
        Vuelo vuelo = vueloRepo.findById(dto.vuelo())
                .orElseThrow(() -> new ResourceNotFoundException("Vuelo no encontrado"));

        Reserva reserva = Reserva.builder().vuelo(vuelo).total(BigDecimal.ZERO).build();

        BigDecimal totalEquipaje = BigDecimal.ZERO;

        for (PasajeroCreateDTO p : dto.pasajeros()) {
            Pasajero pasajero = Pasajero.builder()
                    .reserva(reserva)
                    .nombre(p.nombre())
                    .documento(p.documento())
                    .build();

            if (p.equipaje() != null) {
                for (PasajeroEquipajeCreateDTO eq : p.equipaje()) {
                    Equipaje equipaje = equipajeRepo.findById(eq.equipaje())
                            .orElseThrow(() -> new ResourceNotFoundException("Equipaje no encontrado"));
                    BigDecimal subtotal = equipaje.getCosto()
                            .multiply(BigDecimal.valueOf(eq.cantidad()));
                    pasajero.getEquipaje().add(PasajeroEquipaje.builder()
                            .pasajero(pasajero)
                            .equipaje(equipaje)
                            .cantidad(eq.cantidad())
                            .subtotal(subtotal)
                            .build());
                    totalEquipaje = totalEquipaje.add(subtotal);
                }
            }
            reserva.getPasajeros().add(pasajero);
        }

        BigDecimal total = CalculadoraTotal.calcular(
                vuelo.getPrecio(), dto.pasajeros().size(), totalEquipaje);
        reserva.setTotal(total);

        Reserva saved = reservaRepo.save(reserva);
        return mapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ReservaDTO buscar(String documento, String numeroVuelo) {
        return reservaRepo.buscarPorDocumentoYVuelo(documento, numeroVuelo, PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .map(mapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró la reserva"));
    }
}
