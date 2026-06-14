package pe.edu.upeu.vuelos_api.util;

import java.math.BigDecimal;

public final class CalculadoraTotal {

    private CalculadoraTotal() {}

    public static BigDecimal calcular(BigDecimal precioVuelo,
                                      int cantidadPasajeros,
                                      BigDecimal totalEquipaje) {
        return precioVuelo
                .multiply(BigDecimal.valueOf(cantidadPasajeros))
                .add(totalEquipaje == null ? BigDecimal.ZERO : totalEquipaje);
    }
}
