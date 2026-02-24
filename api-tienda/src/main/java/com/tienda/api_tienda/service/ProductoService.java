package com.tienda.api_tienda.service;

import com.tienda.api_tienda.dto.ProductoRequestDTO;
import com.tienda.api_tienda.dto.ProductoResponseDTO;
import com.tienda.api_tienda.mapper.ProductoMapper;
import com.tienda.api_tienda.model.Producto;
import com.tienda.api_tienda.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<ProductoResponseDTO> listar() {
        return repository.findAll().stream()
                .map(ProductoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductoResponseDTO crear(ProductoRequestDTO dto) {
        Producto producto = ProductoMapper.toEntity(dto);
        Producto guardado = repository.save(producto);
        return ProductoMapper.toResponseDTO(guardado);
    }

    public ProductoResponseDTO obtenerPorId(Integer id) {
        Producto producto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return ProductoMapper.toResponseDTO(producto);
    }

    public ProductoResponseDTO actualizarParcial(Integer id, ProductoRequestDTO dto) {
        Producto producto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        ProductoMapper.updateEntity(producto, dto);
        Producto actualizado = repository.save(producto);
        return ProductoMapper.toResponseDTO(actualizado);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
