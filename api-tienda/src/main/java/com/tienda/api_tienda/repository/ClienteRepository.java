package com.tienda.api_tienda.repository;

import com.tienda.api_tienda.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
