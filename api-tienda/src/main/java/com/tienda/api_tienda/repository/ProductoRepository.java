package com.tienda.api_tienda.repository;

import com.tienda.api_tienda.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
