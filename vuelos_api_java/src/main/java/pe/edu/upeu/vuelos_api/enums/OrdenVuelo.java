package pe.edu.upeu.vuelos_api.enums;

public enum OrdenVuelo {
    NUMERO, FECHA;

    public static OrdenVuelo fromParam(String value) {
        if (value == null) return NUMERO;
        return switch (value.toLowerCase()) {
            case "fecha" -> FECHA;
            default -> NUMERO;
        };
    }
}
