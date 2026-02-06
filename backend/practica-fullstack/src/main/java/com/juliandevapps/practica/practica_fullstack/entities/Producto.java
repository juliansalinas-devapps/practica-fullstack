package com.juliandevapps.practica.practica_fullstack.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import lombok.Data;

@Entity
@Table(name = "producto")
@Data // Generación de getters/setters automáticos con Lombok
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(name = "nombre_producto", unique = true, nullable = false, length = 150)
    private String nombre;

    @Column(name = "marca_producto", length = 100)
    private String marca;

    @Column(name = "categoria_producto", length = 100)
    private String categoria;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0") // Regla de la practica
    @Column(name = "precio_producto", precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull(message = "La existencia es obligatoria")
    @Min(value = 0, message = "Las existencias no pueden ser negativas") // Regla de la practica
    @Column(name = "existencia_producto")
    private Integer existencia;

    @Column(name = "activo_producto")
    private Boolean activo = true; // Por defecto activo
}