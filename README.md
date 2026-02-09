# Sistema de Gestión de Inventarios - Full-Stack

Este proyecto es una aplicación web completa para la administración de productos, desarrollada con una arquitectura desacoplada utilizando **Spring Boot** para el Backend y **Angular** para el Frontend.

## Funcionalidades (CRUD Completo)
- **Registro de Productos**: Formulario reactivo con validaciones de campos obligatorios.
- **Visualización en Tiempo Real**: Tabla dinámica conectada a MySQL mediante una API REST.
- **Edición de Datos**: Capacidad de actualizar nombre, marca, categoría y precio.
- **Control de Stock**: Lógica de negocio que impide existencias negativas.
- **Activación Lógica**: Sistema de "On/Off" para habilitar o deshabilitar productos.
- **Eliminación Física**: Borrado definitivo de registros de la base de datos.

## Tecnologías Utilizadas
### Backend
- **Java 17** con **Spring Boot**.
- **Spring Data JPA**: Para la persistencia de datos.
- **MySQL**: Base de datos relacional (vía XAMPP).
- **Maven**: Gestión de dependencias.

### Frontend
- **Angular 19**: Framework principal.
- **Bootstrap 5**: Diseño de interfaz profesional y responsivo.
- **RxJS**: Manejo de peticiones HTTP asíncronas.

## Configuración del Entorno
1. **Base de Datos**: Importar la estructura en MySQL y asegurar que corra en el puerto 3306.
2. **Backend**: Ejecutar la aplicación desde IntelliJ (Puerto 8080).
3. **Frontend**:
    - `npm install`
    - `ng serve` (Puerto 4200).