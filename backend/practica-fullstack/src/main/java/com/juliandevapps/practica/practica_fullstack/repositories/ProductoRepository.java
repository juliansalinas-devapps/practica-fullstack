package com.juliandevapps.practica.practica_fullstack.repositories;

import com.juliandevapps.practica.practica_fullstack.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    // metodos como save(), findById(), y findAll() deberian estar listos para usarse.
}