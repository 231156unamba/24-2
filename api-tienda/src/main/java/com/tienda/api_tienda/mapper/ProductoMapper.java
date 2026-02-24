package com.tienda.api_tienda.mapper;

import com.tienda.api_tienda.dto.ProductoRequestDTO;
import com.tienda.api_tienda.dto.ProductoResponseDTO;
import com.tienda.api_tienda.model.Producto;

public class ProductoMapper {

    public static Producto toEntity(ProductoRequestDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.nombre);
        producto.setPrecio(dto.precio);
        producto.setStock(dto.stock);
        producto.setIdCategoria(dto.idCategoria);
        return producto;
    }

    public static ProductoResponseDTO toResponseDTO(Producto producto) {
        ProductoResponseDTO dto = new ProductoResponseDTO();
        dto.idProducto = producto.getIdProducto();
        dto.nombre = producto.getNombre();
        dto.precio = producto.getPrecio();
        dto.stock = producto.getStock();
        dto.idCategoria = producto.getIdCategoria();
        return dto;
    }

    public static void updateEntity(Producto producto, ProductoRequestDTO dto) {
        if (dto.nombre != null) producto.setNombre(dto.nombre);
        if (dto.precio != null) producto.setPrecio(dto.precio);
        if (dto.stock != null) producto.setStock(dto.stock);
        if (dto.idCategoria != null) producto.setIdCategoria(dto.idCategoria);
    }
}
