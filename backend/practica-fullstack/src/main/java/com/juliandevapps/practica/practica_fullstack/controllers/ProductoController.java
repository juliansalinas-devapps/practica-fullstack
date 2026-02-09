package com.juliandevapps.practica.practica_fullstack.controllers;

import com.juliandevapps.practica.practica_fullstack.entities.Producto;
import com.juliandevapps.practica.practica_fullstack.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos") // Endpoint base requerido
@CrossOrigin(origins = "http://localhost:4200") // Importante para que Angular pueda conectarse después
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> listar() {
        return productoService.listarTodos();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    @GetMapping("/{id}")
    public Producto detalle(@PathVariable Integer id) {
        return productoService.buscarPorId(id);
    }

    // Endpoint para ajustar inventario (PATCH se usa para actualizaciones parciales)
    @PatchMapping("/{id}/ajuste")
    public Producto ajustar(@PathVariable Integer id, @RequestParam Integer cantidad, @RequestParam String razon) {
        return productoService.ajustarInventario(id, cantidad, razon);
    }

    // Endpoint para activar/desactivar
    @PatchMapping("/{id}/estado")
    public Producto toggleEstado(@PathVariable Integer id, @RequestParam boolean activo) {
        return productoService.cambiarEstado(id, activo);
    }
    // Endpoint para actualizar todos los campos del producto (CRUD - Update)
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @RequestBody Producto detallesProducto) {
        Producto productoExistente = productoService.buscarPorId(id);

        // Actualiza los campos con los nuevos datos recibidos de Angular
        productoExistente.setNombre(detallesProducto.getNombre());
        productoExistente.setMarca(detallesProducto.getMarca());
        productoExistente.setCategoria(detallesProducto.getCategoria());
        productoExistente.setPrecio(detallesProducto.getPrecio());
        productoExistente.setExistencia(detallesProducto.getExistencia());

        return productoService.guardar(productoExistente);
    }

    // Endpoint para eliminar físicamente (CRUD - Delete)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
    }

}

