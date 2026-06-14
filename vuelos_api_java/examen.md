# Banco de preguntas — Vuelos API (Java/Spring Boot)

Preguntas tipo examen sobre el proyecto `vuelos_api_java`, organizadas por bloque temático y dificultad.

Convenciones:
- ✅ Respuesta correcta marcada con check.
- 💡 Justificación breve después de cada respuesta.

---

## Bloque 1 · Arquitectura y diseño general

### 1. (Opción múltiple) ¿Qué patrón de capas implementa el proyecto?

- a) MVC clásico de servlets (Servlet → JSP → JDBC)
- b) Onion Architecture con CQRS
- ✅ c) Controller → Service → Repository, con DTOs y entidades JPA separadas
- d) Microservicios con event sourcing

💡 El código está dividido en `controller/`, `service/`, `repository/`, `entity/`, `dto/`, `mapper/`. Es la estratificación clásica de Spring Boot.

---

### 2. (V/F) Las clases del paquete `entity` se exponen directamente como respuesta JSON.

- ✅ **Falso**

💡 Se exponen los **DTO records** (`VueloDTO`, `ReservaDTO`, etc.). Las entidades se mapean con MapStruct (`ReservaMapper`, `VueloMapper`, `EquipajeMapper`). Esto evita exponer la estructura de BD y rompe ciclos de serialización.

---

### 3. (Desarrollo corto) Explica por qué usar `record` para los DTO en este proyecto.

**Respuesta esperada:**
- Los `record` (Java 16+) generan automáticamente constructor canónico, `equals`, `hashCode`, `toString` y accesores.
- Son **inmutables**, lo que es correcto para un DTO (datos de transporte, no estado mutable).
- Reducen *boilerplate*: `public record VueloDTO(Long id, String numero, ...)` reemplaza ~50 líneas de POJO con Lombok.

---

### 4. (Opción múltiple) ¿Por qué se separa `service` (interfaz) de `service/impl` (implementación)?

- a) Es obligatorio en Spring Boot
- ✅ b) Permite inyectar dobles/mocks en tests y desacoplar al `Controller` de la implementación concreta
- c) Mejora el rendimiento en tiempo de ejecución
- d) Hibernate solo funciona con interfaces

💡 La **inversión de dependencias**: `ReservaController` depende de `ReservaService` (interfaz), no de `ReservaServiceImpl`. Esto facilita testing y futuras implementaciones alternativas.

---

## Bloque 2 · Endpoints REST

### 5. (Opción múltiple) ¿Qué código HTTP devuelve `POST /api/reservas` cuando la creación es exitosa?

- a) 200 OK
- ✅ b) 201 Created
- c) 204 No Content
- d) 202 Accepted

💡 En el controller: `ResponseEntity.status(HttpStatus.CREATED).body(...)`. Es la convención REST para creación de recursos.

---

### 6. (Desarrollo) Lista los 6 endpoints expuestos por la API y su método HTTP.

| # | Método | Ruta | Función |
|---|--------|------|---------|
| 1 | GET    | `/api/vuelos?order=numero\|fecha` | Listar catálogo de vuelos |
| 2 | GET    | `/api/equipajes` | Listar tipos de equipaje |
| 3 | GET    | `/api/reservas` | Listar reservas (boleta expandida) |
| 4 | POST   | `/api/reservas` | Crear reserva |
| 5 | GET    | `/api/reservas/buscar?documento&numero_vuelo` | Buscar reserva (más reciente) |
| 6 | POST   | `/api/reservas/buscar-post` | Misma búsqueda con body JSON |

---

### 7. (V/F) `GET /api/vuelos/` (con barra final) responde igual que `GET /api/vuelos`.

- ✅ **Verdadero**

💡 En `CorsConfig.configurePathMatch()` activamos `setUseTrailingSlashMatch(true)` para preservar la compatibilidad con el cliente existente que llamaba a la API original en Django/DRF.

---

### 8. (Opción múltiple) ¿Cómo se reciben los parámetros en `POST /api/reservas/buscar-post`?

- a) Como query string
- ✅ b) En el cuerpo JSON, validados con `@Valid BuscarReservaDTO`
- c) En headers HTTP
- d) En cookies

💡 Ver `ReservaController.buscarPost(@RequestBody @Valid BuscarReservaDTO dto)`.

---

### 9. (Código) ¿Qué hace `@JsonProperty("numero_vuelo")` en `BuscarReservaDTO`?

```java
public record BuscarReservaDTO(
        @NotBlank String documento,
        @NotBlank @JsonProperty("numero_vuelo") String numeroVuelo
) {}
```

**Respuesta:** Mapea el campo Java `numeroVuelo` (camelCase, convención Java) al campo JSON `numero_vuelo` (snake_case, convención del cliente). Sin esa anotación, Jackson esperaría un JSON `{"numeroVuelo": "..."}` y rechazaría `{"numero_vuelo": "..."}`.

---

## Bloque 3 · Modelo de datos y JPA

### 10. (Opción múltiple) ¿Qué tipo de relación une `Reserva` y `Pasajero`?

- a) `@OneToOne`
- ✅ b) `@OneToMany` (Reserva → Pasajeros) con `@ManyToOne` (Pasajero → Reserva)
- c) `@ManyToMany`
- d) Sin relación, solo un campo `Long reservaId`

💡 Una reserva tiene N pasajeros; cada pasajero pertenece a UNA reserva. Ver `Reserva.pasajeros` con `mappedBy = "reserva"` y `Pasajero.reserva`.

---

### 11. (V/F) `cascade = CascadeType.ALL` en `Reserva.pasajeros` significa que al borrar una reserva se borran sus pasajeros.

- ✅ **Verdadero**, además junto con `orphanRemoval = true` también borra pasajeros que se quitan de la lista en memoria.

💡 Esto permite, en el `crear()` del servicio, **persistir todo el grafo en una sola llamada `reservaRepo.save(reserva)`**.

---

### 12. (Opción múltiple) ¿Por qué se eligió `BigDecimal` para `precio`, `costo`, `subtotal` y `total`?

- a) Es más rápido que `double`
- ✅ b) Evita errores de precisión en operaciones monetarias (los `double`/`float` no pueden representar exactamente `0.10`)
- c) Es el único tipo que soporta JPA
- d) Usa menos memoria

💡 `0.1 + 0.2` en `double` da `0.30000000000000004`. Para dinero siempre `BigDecimal`.

---

### 13. (Desarrollo) ¿Qué hace `@CreationTimestamp` en `Reserva.creado`?

**Respuesta:** Es una anotación de Hibernate que asigna automáticamente la fecha/hora actual al **insertar** la entidad. Combinado con `updatable = false`, garantiza que el campo se establece una vez y no se sobrescribe en updates posteriores. Sirve para registrar cuándo se creó la reserva sin tener que hacerlo manualmente.

---

### 14. (Opción múltiple) ¿Para qué sirve `fetch = FetchType.LAZY` en `@ManyToOne`?

- a) Cifra la conexión a la BD
- ✅ b) Posterga la carga del objeto relacionado hasta que se accede a él, evitando JOINs innecesarios
- c) Acelera siempre todas las consultas
- d) Hace la entidad inmutable

💡 Por defecto `@ManyToOne` es EAGER. LAZY mejora rendimiento, pero requiere cuidar la transacción (de ahí `spring.jpa.open-in-view`).

---

### 15. (Código) ¿Qué problema podría aparecer con la siguiente consulta y cómo se resolvió?

```java
@Query("""
       select distinct r from Reserva r
         join fetch r.vuelo v
         join r.pasajeros p
        where v.numero = :numeroVuelo and p.documento = :documento
       """)
Optional<Reserva> buscar(...);  // versión inicial
```

**Respuesta:** Si un mismo pasajero hizo **varias reservas en el mismo vuelo**, la consulta devolvería más de un resultado y Spring Data lanzaría `IncorrectResultSizeDataAccessException` / `NonUniqueResultException` al desempaquetar el `Optional`.

**Solución aplicada:** se cambió la firma a `List<Reserva>` con `Pageable` + `order by r.creado desc`, y en el servicio se toma el primero:

```22:25:src/main/java/pe/edu/upeu/vuelos_api/repository/ReservaRepository.java
            order by r.creado desc
           """)
    List<Reserva> buscarPorDocumentoYVuelo(@Param("documento") String documento,
                                           @Param("numeroVuelo") String numeroVuelo,
                                           Pageable pageable);
```

```86:93:src/main/java/pe/edu/upeu/vuelos_api/service/impl/ReservaServiceImpl.java
    public ReservaDTO buscar(String documento, String numeroVuelo) {
        return reservaRepo.buscarPorDocumentoYVuelo(documento, numeroVuelo, PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .map(mapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró la reserva"));
    }
```

---

## Bloque 4 · Lógica de negocio

### 16. (Cálculo) Una reserva tiene:
- Vuelo `LA2034` con `precio = 250.00`
- 2 pasajeros
- Pasajero A: 1 × `Maleta 23kg` (45.00)
- Pasajero B: 1 × `Maleta 32kg` (80.00) + 1 × `Maleta 23kg` (45.00)

¿Cuál es el `total`?

**Respuesta:**
```
precio_vuelo × n_pasajeros = 250 × 2 = 500
suma_equipaje  = 45 + 80 + 45 = 170
TOTAL          = 500 + 170 = 670.00
```

💡 Coincide con la fórmula de `CalculadoraTotal.calcular()`:
```9:14:src/main/java/pe/edu/upeu/vuelos_api/util/CalculadoraTotal.java
    public static BigDecimal calcular(BigDecimal precioVuelo,
                                      int cantidadPasajeros,
                                      BigDecimal totalEquipaje) {
        return precioVuelo
                .multiply(BigDecimal.valueOf(cantidadPasajeros))
                .add(totalEquipaje == null ? BigDecimal.ZERO : totalEquipaje);
    }
```

---

### 17. (V/F) El cliente puede enviar `total` en el JSON de `POST /api/reservas` y ese valor se guarda en BD.

- ✅ **Falso**

💡 `ReservaCreateDTO` solo tiene `vuelo` y `pasajeros`. El `total` se calcula en el servidor (`ReservaServiceImpl.crear`) usando `CalculadoraTotal`. Esto evita manipulación maliciosa del precio desde el cliente.

---

### 18. (Opción múltiple) ¿Qué pasa si en `POST /api/reservas` envías un `vuelo: 999` que no existe?

- a) Se crea la reserva con vuelo nulo
- ✅ b) Devuelve **HTTP 404** con `{"detail": "Vuelo no encontrado"}`
- c) Devuelve 500
- d) Devuelve 200 con un body vacío

💡 `vueloRepo.findById(...).orElseThrow(() -> new ResourceNotFoundException("Vuelo no encontrado"))`. El `GlobalExceptionHandler` lo traduce a 404.

---

### 19. (Opción múltiple) `ReservaCreateDTO` valida que la lista de pasajeros tenga al menos 1 elemento. ¿Con qué anotación?

- a) `@NotNull` solo
- ✅ b) `@Size(min = 1, message = "Debe haber al menos 1 pasajero")` + `@Valid` para que se validen los pasajeros internos
- c) `@MinSize(1)` (no existe en Bean Validation)
- d) `@NotEmpty` solo en el constructor

💡 Ver `ReservaCreateDTO`. `@Valid` propaga la validación a cada `PasajeroCreateDTO` de la lista.

---

## Bloque 5 · Spring/Configuración

### 20. (V/F) Eliminar Lombok del proyecto rompería la compilación.

- ✅ **Verdadero**

💡 Las entidades usan `@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder`, y los servicios/controllers usan `@RequiredArgsConstructor` para la inyección por constructor de campos `final`. Sin Lombok, faltarían getters, setters y constructores.

---

### 21. (Opción múltiple) ¿Cuál es el perfil activo por defecto y qué BD usa?

- ✅ a) `h2`, base de datos H2 en memoria
- b) `prod`, PostgreSQL
- c) `dev`, MySQL
- d) Ninguno, no hay BD configurada

💡 En `application.yml`: `spring.profiles.active: h2` y en `application-h2.yml`: `jdbc:h2:mem:vuelos`.

---

### 22. (Desarrollo) ¿Por qué `data.sql` y `data-postgres.sql` son archivos distintos?

**Respuesta:** Cada motor tiene su sintaxis idempotente:
- **H2**: `MERGE INTO tabla (...) KEY(id) VALUES (...)` (extensión H2).
- **PostgreSQL**: `INSERT INTO ... ON CONFLICT (id) DO NOTHING` (cláusula PG).

H2 (incluso con `MODE=PostgreSQL`) **no entiende `ON CONFLICT`**, por eso el primer intento de unificar falló con `Syntax error 42000`. La solución fue separar los seeds y configurar en `application-postgres.yml`:
```yaml
spring:
  sql:
    init:
      data-locations: classpath:data-postgres.sql
```

---

### 23. (Opción múltiple) ¿Qué hace `defer-datasource-initialization: true` en `application.yml`?

- a) Desactiva la inicialización de la BD
- ✅ b) Espera a que Hibernate cree el esquema antes de ejecutar `data.sql`
- c) Hace que `data.sql` se ejecute en background
- d) Solo aplica a Postgres

💡 Sin esta opción, Spring intenta correr `data.sql` antes de que las tablas existan y falla con "Table not found".

---

### 24. (Opción múltiple) ¿Qué patrón de inyección de dependencias se usa?

- ✅ a) Por constructor (con Lombok `@RequiredArgsConstructor` sobre campos `private final`)
- b) Por setter
- c) Por reflexión con `@Autowired` en campos
- d) Localizador de servicios (`ApplicationContext.getBean(...)`)

💡 Es la opción **recomendada por Spring** desde 4.3. Ventajas: dependencias inmutables, fáciles de testear, NPE imposibles de fábrica.

---

## Bloque 6 · MapStruct y mapeo

### 25. (V/F) `ReservaMapper` necesita una clase con código manual para convertir `Reserva` a `ReservaDTO`.

- ✅ **Falso**

💡 Es una **interfaz** anotada con `@Mapper(componentModel = "spring", uses = {VueloMapper.class, EquipajeMapper.class})`. MapStruct **genera la implementación en tiempo de compilación** (queda en `build/generated/sources/annotationProcessor/.../ReservaMapperImpl.java`).

---

### 26. (Opción múltiple) ¿Por qué `ReservaMapper` declara `uses = {VueloMapper.class, EquipajeMapper.class}`?

- a) Para inyectarlos como dependencias en el controller
- ✅ b) Para que MapStruct delegue el mapeo de `Vuelo→VueloDTO` y `Equipaje→EquipajeDTO` a esos mappers en lugar de generar duplicados
- c) Para activar la caché de Hibernate
- d) Es solo decorativo, no tiene efecto

💡 Reutilización: MapStruct invoca los mappers existentes para los tipos relacionados, manteniendo el código DRY.

---

## Bloque 7 · Manejo de errores

### 27. (Opción múltiple) ¿Qué clase centraliza la traducción de excepciones a respuestas HTTP?

- a) `CorsConfig`
- ✅ b) `GlobalExceptionHandler` con `@RestControllerAdvice`
- c) `ResourceNotFoundException`
- d) `ApiError`

---

### 28. (Desarrollo) ¿Qué responde la API si envío `POST /api/reservas` con `pasajeros: []`?

**Respuesta esperada:**
- HTTP **400 Bad Request**
- Body: `{"detail": "pasajeros: Debe haber al menos 1 pasajero"}`

💡 Lo activa la anotación `@Size(min = 1, ...)` y lo formatea `GlobalExceptionHandler.validation(...)` concatenando `field: defaultMessage`.

---

### 29. (V/F) Si `equipaje.id = 999` (no existe) en el body del POST, la reserva se crea **sin** ese equipaje y se devuelve 201.

- ✅ **Falso**

💡 `equipajeRepo.findById(...).orElseThrow(...)` lanza `ResourceNotFoundException` y la operación completa se aborta (la transacción se revierte por estar el método anotado con `@Transactional`). Devuelve **404 "Equipaje no encontrado"**.

---

## Bloque 8 · Ordenamiento y paginación

### 30. (Opción múltiple) ¿Cómo se implementa el parámetro `order=numero|fecha` en `GET /api/vuelos`?

- a) Con un `if/else` y `Collections.sort` en memoria
- ✅ b) Con `Sort` de Spring Data y un `enum OrdenVuelo` que mapea el string al campo correcto
- c) Con SQL nativo en `@Query`
- d) Con un `Comparator` personalizado en el controller

💡 Ver `VueloServiceImpl`:
```22:28:src/main/java/pe/edu/upeu/vuelos_api/service/impl/VueloServiceImpl.java
    public List<VueloDTO> listar(String order) {
        Sort sort = switch (OrdenVuelo.fromParam(order)) {
            case FECHA  -> Sort.by("fechaSalida").ascending();
            case NUMERO -> Sort.by("numero").ascending();
        };
        return repo.findAll(sort).stream().map(mapper::toDto).toList();
    }
```

Esto delega el ordenamiento a la BD (más eficiente) y aprovecha el `enum` para evitar valores inválidos del cliente.

---

### 31. (Código) ¿Qué hace `PageRequest.of(0, 1)` en el método `buscar`?

**Respuesta:** Pide la **primera página (índice 0) con tamaño 1**, es decir, **solo el primer resultado** de la consulta. Combinado con `order by r.creado desc`, equivale a `LIMIT 1` ordenando por más reciente. JPQL no tiene `LIMIT` portable, así que esta es la forma estándar de Spring Data.

---

## Bloque 9 · CORS y seguridad básica

### 32. (Opción múltiple) ¿Qué orígenes acepta CORS por defecto en este proyecto?

- a) `*` (cualquiera)
- ✅ b) `http://localhost:4200` y `http://127.0.0.1:4200` (Angular dev server)
- c) Solo `https://vuelos-api.multicomp.pe`
- d) Ninguno, el CORS está deshabilitado

💡 En `application.yml`:
```yaml
app:
  cors:
    allowed-origins: http://localhost:4200,http://127.0.0.1:4200
```

---

### 33. (V/F) Si quiero agregar `https://miapp.com` a los orígenes permitidos, debo recompilar y volver a deployar el JAR.

- ✅ **Falso**

💡 Es una **propiedad externalizada** (`@Value("${app.cors.allowed-origins}")`). Basta con cambiar `application.yml`, pasar `--app.cors.allowed-origins=...` por argumento, o setear la variable de entorno `APP_CORS_ALLOWED_ORIGINS`.

---

## Bloque 10 · Preguntas de código (interpretar/escribir)

### 34. (Lectura de código) ¿Qué imprime el siguiente flujo si el `vuelo.precio = 100` y hay 3 pasajeros sin equipaje?

```java
BigDecimal totalEquipaje = BigDecimal.ZERO;
BigDecimal total = CalculadoraTotal.calcular(
    vuelo.getPrecio(), dto.pasajeros().size(), totalEquipaje);
System.out.println(total);
```

- ✅ **300** (técnicamente `300` o `300.00` según escala, pero matemáticamente 300)

💡 `100 × 3 + 0 = 300`.

---

### 35. (Escritura) Escribe el JSON mínimo válido para `POST /api/reservas` con un solo pasajero sin equipaje.

```json
{
  "vuelo": 1,
  "pasajeros": [
    {
      "nombre": "Ana Torres",
      "documento": "10000001",
      "equipaje": []
    }
  ]
}
```

💡 `equipaje` puede ser `[]` o incluso omitirse (no lleva `@NotNull`).

---

### 36. (Lectura) ¿Qué problema tiene este código si se ejecutara fuera de un método `@Transactional` en sesión LAZY?

```java
Reserva r = reservaRepo.findById(1L).orElseThrow();
return r.getPasajeros().size();  // ¿qué pasa?
```

**Respuesta:** Lanzaría `LazyInitializationException` porque la sesión de Hibernate ya está cerrada cuando se intenta cargar la colección `pasajeros` (que es `@OneToMany` LAZY por defecto). Soluciones:

1. Anotar el método con `@Transactional(readOnly = true)`.
2. Usar `JOIN FETCH` en el `@Query` (como hace `buscarPorDocumentoYVuelo`).
3. Activar `spring.jpa.open-in-view=true` (ya está activo, pero es antipatrón en producción).

---

### 37. (Diseño) Si un usuario quiere **cancelar** una reserva, ¿qué cambios mínimos haría?

**Respuesta esperada (cualquier 3 de estos puntos):**
- Agregar campo `estado` (enum `ACTIVA | CANCELADA`) a `Reserva` con `@Enumerated(EnumType.STRING)`.
- Endpoint `DELETE /api/reservas/{id}` o `PATCH /api/reservas/{id}/cancelar`.
- Método en `ReservaService` que cambie el estado (no borre físicamente, soft delete).
- Filtrar `listar()` para devolver solo `ACTIVA` por defecto.
- Test unitario / integración del nuevo flujo.

---

### 38. (Diseño) ¿Qué cambio mínimo se requeriría para que la API devuelva la lista de reservas **paginadas**?

**Respuesta:**
1. Cambiar firma del controller:
   ```java
   @GetMapping
   public Page<ReservaDTO> listar(Pageable pageable) { ... }
   ```
2. Service:
   ```java
   public Page<ReservaDTO> listar(Pageable p) {
       return reservaRepo.findAll(p).map(mapper::toDto);
   }
   ```
3. Llamar como `GET /api/reservas?page=0&size=10&sort=creado,desc`.

Ya no hay que tocar nada más: Spring Data resuelve `Pageable` automáticamente desde los query params.

---

## Apéndice · Quick reference

| Concepto | Dónde mirarlo |
|----------|---------------|
| Cálculo del total | `util/CalculadoraTotal.java` |
| Validaciones de entrada | DTOs `*CreateDTO` (Bean Validation) |
| Manejo de 404/400 | `exception/GlobalExceptionHandler.java` |
| Slash final | `config/CorsConfig.java` (`configurePathMatch`) |
| Seeds | `resources/data.sql` (H2), `resources/data-postgres.sql` (PG) |
| Ordenamiento de vuelos | `enums/OrdenVuelo.java` + `service/impl/VueloServiceImpl.java` |
| Búsqueda por doc + vuelo | `repository/ReservaRepository.java` |

---

## Pauta de auto-evaluación

| Aciertos | Nivel sugerido |
|----------|----------------|
| 0 – 12   | Necesitas releer la estructura del proyecto y conceptos básicos de Spring Boot. |
| 13 – 24  | Dominas lo esencial. Refuerza JPA (LAZY/EAGER, transacciones) y validaciones. |
| 25 – 32  | Buen nivel. Practica las preguntas de diseño (37, 38). |
| 33 – 38  | Excelente. Estás listo para defender el proyecto en una sustentación. |
