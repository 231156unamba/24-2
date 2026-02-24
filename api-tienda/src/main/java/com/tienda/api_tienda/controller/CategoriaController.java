package com.tienda.api_tienda.controller;

import com.tienda.api_tienda.dto.CategoriaRequestDTO;
import com.tienda.api_tienda.dto.CategoriaResponseDTO;
import com.tienda.api_tienda.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoriaResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaResponseDTO crear(@RequestBody CategoriaRequestDTO dto) {
        return service.crear(dto);
    }

    @GetMapping("/{id}")
    public CategoriaResponseDTO obtener(@PathVariable Integer id) {
    return service.obtenerPorId(id);
    }

    @PatchMapping("/{id}")
    public CategoriaResponseDTO patch(@PathVariable Integer id,
                                @RequestBody CategoriaRequestDTO dto) {
    return service.actualizarParcial(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Integer id) {
    service.eliminar(id);
    }
}