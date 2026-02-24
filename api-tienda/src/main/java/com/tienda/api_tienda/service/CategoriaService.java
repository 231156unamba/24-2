package com.tienda.api_tienda.service;

import com.tienda.api_tienda.dto.CategoriaRequestDTO;
import com.tienda.api_tienda.dto.CategoriaResponseDTO;
import com.tienda.api_tienda.mapper.CategoriaMapper;
import com.tienda.api_tienda.model.Categoria;
import com.tienda.api_tienda.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    public List<CategoriaResponseDTO> listar() {
        return repo.findAll().stream()
                .map(CategoriaMapper::toDTO)
                .toList();
    }

    public CategoriaResponseDTO crear(CategoriaRequestDTO dto) {
        if (dto.nombre == null || dto.nombre.isBlank()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        Categoria guardado = repo.save(CategoriaMapper.toEntity(dto));
        return CategoriaMapper.toDTO(guardado);
    }

    public CategoriaResponseDTO obtenerPorId(Integer id) {
    Categoria c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    return CategoriaMapper.toDTO(c);
    }

    public CategoriaResponseDTO actualizarParcial(Integer id, CategoriaRequestDTO dto) {
    Categoria c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

    // PATCH: solo actualiza lo que viene (no null)
    if (dto.nombre != null && !dto.nombre.isBlank()) {
        c.setNombre(dto.nombre);
    }
    if (dto.descripcion != null) {
        c.setDescripcion(dto.descripcion);
    }

    Categoria guardado = repo.save(c);
    return CategoriaMapper.toDTO(guardado);
    }

    public void eliminar(Integer id) {
    if (!repo.existsById(id)) {
        throw new RuntimeException("Categoría no encontrada");
    }
    repo.deleteById(id);
}
}