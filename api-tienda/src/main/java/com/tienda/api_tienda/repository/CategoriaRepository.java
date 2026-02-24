package com.tienda.api_tienda.repository;

import com.tienda.api_tienda.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}