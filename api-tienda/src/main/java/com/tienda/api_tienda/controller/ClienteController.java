package com.tienda.api_tienda.controller;

import com.tienda.api_tienda.dto.ClienteRequestDTO;
import com.tienda.api_tienda.dto.ClienteResponseDTO;
import com.tienda.api_tienda.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<ClienteResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponseDTO crear(@RequestBody ClienteRequestDTO dto) {
        return service.crear(dto);
    }

    @GetMapping("/{id}")
    public ClienteResponseDTO obtener(@PathVariable Integer id) {
        return service.obtenerPorId(id);
    }

    @PatchMapping("/{id}")
    public ClienteResponseDTO patch(@PathVariable Integer id,
                                    @RequestBody ClienteRequestDTO dto) {
        return service.actualizarParcial(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
