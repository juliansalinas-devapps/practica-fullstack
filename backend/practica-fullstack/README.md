# Backend - API de Inventarios

Servidor desarrollado con **Spring Boot** para gestionar los productos y el stock.

## Requisitos e Instalación
1. Tener instalado **XAMPP** y activar MySQL en el puerto `3306`.
2. Crear la base de datos `prueba1_devapps`.
3. Configurar el archivo `src/main/resources/application.properties` con tus credenciales:
    - `spring.datasource.username=tu_usuario`
    - `spring.datasource.password=tu_contraseña`

## Endpoints Principales
* `GET /productos`: Listar todos los productos.
* `POST /productos`: Crear un nuevo producto.
* `PATCH /productos/{id}/ajustar-inventario`: (En desarrollo) Ajustar stock.

## Validaciones Implementadas
- El nombre del producto es único.
- El precio debe ser mayor a 0.
- Las existencias no pueden ser negativas.