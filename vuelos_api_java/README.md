# Vuelos API (Spring Boot)

Backend Java 21 + Spring Boot 3 + JPA + H2/PostgreSQL para reservas de vuelos.

## Requisitos

- Java 21
- Gradle (o usa el wrapper `gradlew` generado al primer build)
- Docker (opcional, solo si quieres Postgres)

## Generar el Gradle Wrapper (solo la primera vez)

```bash
gradle wrapper
```

Si no tienes Gradle global instalado:
- Descarga Gradle desde https://gradle.org/install/
- O instala con Chocolatey: `choco install gradle`
- O usa SDKMAN: `sdk install gradle`

## Ejecutar (con H2 en memoria, por defecto)

```bash
gradlew bootRun
```

Listo. El servidor arranca en `http://localhost:8080/api/`.

La consola H2 queda accesible en `http://localhost:8080/h2`:
- JDBC URL: `jdbc:h2:mem:vuelos`
- User: `sa` (sin password)

## Ejecutar con PostgreSQL

1. Levanta Postgres:
   ```bash
   docker compose up -d
   ```
2. Inicia la app con el perfil postgres:
   ```bash
   gradlew bootRun --args='--spring.profiles.active=postgres'
   ```

## Endpoints

| Método | Ruta                                                       | Descripción                                  |
|--------|-----------------------------------------------------------|----------------------------------------------|
| GET    | /api/vuelos?order=numero\|fecha                            | Lista vuelos                                 |
| GET    | /api/equipajes                                            | Lista tipos de equipaje                      |
| GET    | /api/reservas                                             | Lista reservas (boleta expandida)            |
| POST   | /api/reservas                                             | Crea reserva                                 |
| GET    | /api/reservas/buscar?documento=...&numero_vuelo=...       | Busca reserva (más reciente que coincida)    |
| POST   | /api/reservas/buscar-post                                 | Misma búsqueda con `{documento, numero_vuelo}` en body |

Las rutas aceptan también la barra final (`/api/vuelos/`) para compatibilidad con la API original en Django/DRF.

## Ejemplo POST `/api/reservas`

```json
{
  "vuelo": 1,
  "pasajeros": [
    {
      "nombre": "Juan Perez",
      "documento": "12345678",
      "equipaje": [{ "equipaje": 1, "cantidad": 1 }]
    }
  ]
}
```

Respuesta 201 con la boleta expandida (vuelo completo, total, pasajeros y sus equipajes).

## CORS

Permite por defecto `http://localhost:4200` (Angular dev server).
Configurable en `application.yml` → `app.cors.allowed-origins`.

## Construir JAR

```bash
gradlew clean build
java -jar build/libs/vuelos_api-0.0.1-SNAPSHOT.jar
```
