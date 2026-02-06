package com.juliandevapps.practica.practica_fullstack.controllers;

import com.juliandevapps.practica.practica_fullstack.entities.Producto;
import com.juliandevapps.practica.practica_fullstack.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos") // Endpoint base requerido
@CrossOrigin(origins = "*") // Importante para que Angular pueda conectarse después
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
}