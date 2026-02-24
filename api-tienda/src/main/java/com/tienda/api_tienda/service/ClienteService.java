package com.tienda.api_tienda.service;

import com.tienda.api_tienda.dto.ClienteRequestDTO;
import com.tienda.api_tienda.dto.ClienteResponseDTO;
import com.tienda.api_tienda.mapper.ClienteMapper;
import com.tienda.api_tienda.model.Cliente;
import com.tienda.api_tienda.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<ClienteResponseDTO> listar() {
        return repository.findAll().stream()
                .map(ClienteMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ClienteResponseDTO crear(ClienteRequestDTO dto) {
        Cliente cliente = ClienteMapper.toEntity(dto);
        Cliente guardado = repository.save(cliente);
        return ClienteMapper.toResponseDTO(guardado);
    }

    public ClienteResponseDTO obtenerPorId(Integer id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return ClienteMapper.toResponseDTO(cliente);
    }

    public ClienteResponseDTO actualizarParcial(Integer id, ClienteRequestDTO dto) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        ClienteMapper.updateEntity(cliente, dto);
        Cliente actualizado = repository.save(cliente);
        return ClienteMapper.toResponseDTO(actualizado);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
