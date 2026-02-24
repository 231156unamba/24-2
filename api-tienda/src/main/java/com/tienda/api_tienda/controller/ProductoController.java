package com.tienda.api_tienda.controller;

import com.tienda.api_tienda.dto.ProductoRequestDTO;
import com.tienda.api_tienda.dto.ProductoResponseDTO;
import com.tienda.api_tienda.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductoResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductoResponseDTO crear(@RequestBody ProductoRequestDTO dto) {
        return service.crear(dto);
    }

    @GetMapping("/{id}")
    public ProductoResponseDTO obtener(@PathVariable Integer id) {
        return service.obtenerPorId(id);
    }

    @PatchMapping("/{id}")
    public ProductoResponseDTO patch(@PathVariable Integer id,
                                     @RequestBody ProductoRequestDTO dto) {
        return service.actualizarParcial(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
