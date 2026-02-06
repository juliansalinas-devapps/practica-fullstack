package com.juliandevapps.practica.practica_fullstack.services;

import com.juliandevapps.practica.practica_fullstack.entities.Producto;
import com.juliandevapps.practica.practica_fullstack.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Listar todos los productos
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    // Guardar producto con validaciones de la práctica
    public Producto guardar(Producto producto) {
        // Regla: El nombre debe ser único
        // (refinar esto luego con una consulta personalizada)

        // El estado activo por defecto es true al crear
        if (producto.getId() == null) {
            producto.setActivo(true);
        }

        return productoRepository.save(producto);
    }

    // Buscar por ID para el detalle
    public Producto buscarPorId(Integer id) {
        return productoRepository.findById(id).orElse(null);
    }

    // Eliminar (opcional, pero útil para el CRUD)
    public void eliminar(Integer id) {
        productoRepository.deleteById(id);
    }
}