package com.tienda.api_tienda.mapper;

import com.tienda.api_tienda.dto.CategoriaRequestDTO;
import com.tienda.api_tienda.dto.CategoriaResponseDTO;
import com.tienda.api_tienda.model.Categoria;

public class CategoriaMapper {

    public static Categoria toEntity(CategoriaRequestDTO dto) {
        Categoria c = new Categoria();
        c.setNombre(dto.nombre);
        c.setDescripcion(dto.descripcion);
        return c;
    }

    public static CategoriaResponseDTO toDTO(Categoria c) {
        CategoriaResponseDTO dto = new CategoriaResponseDTO();
        dto.idCategoria = c.getIdCategoria();
        dto.nombre = c.getNombre();
        dto.descripcion = c.getDescripcion();
        return dto;
    }
}