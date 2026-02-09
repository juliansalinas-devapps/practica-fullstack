# Backend - Spring Boot API

Servicio RESTful encargado de la lógica de negocio y la persistencia de datos.

## Tecnologías
- **Spring Boot**: Framework principal.
- **Spring Data JPA**: Para el manejo de la base de datos sin SQL manual.
- **Lombok**: Para reducir el código repetitivo (Boilerplate).
- **MySQL Driver**: Conector para la base de datos.

## Endpoints Principales
- `GET /productos`: Listar inventario.
- `POST /productos`: Guardar nuevo producto.
- `PUT /productos/{id}`: Actualizar información completa.
- `PATCH /productos/{id}/ajuste`: Incrementar o decrementar stock.
- `DELETE /productos/{id}`: Eliminar registro.

## Configuración de Seguridad
Se implementó `@CrossOrigin` para permitir peticiones exclusivas desde `http://localhost:4200`.