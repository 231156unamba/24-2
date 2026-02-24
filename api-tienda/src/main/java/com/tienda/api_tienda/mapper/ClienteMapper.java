package com.tienda.api_tienda.mapper;

import com.tienda.api_tienda.dto.ClienteRequestDTO;
import com.tienda.api_tienda.dto.ClienteResponseDTO;
import com.tienda.api_tienda.model.Cliente;

public class ClienteMapper {

    public static Cliente toEntity(ClienteRequestDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setDni(dto.dni);
        cliente.setNombre(dto.nombre);
        cliente.setEmail(dto.email);
        return cliente;
    }

    public static ClienteResponseDTO toResponseDTO(Cliente cliente) {
        ClienteResponseDTO dto = new ClienteResponseDTO();
        dto.idCliente = cliente.getIdCliente();
        dto.dni = cliente.getDni();
        dto.nombre = cliente.getNombre();
        dto.email = cliente.getEmail();
        return dto;
    }

    public static void updateEntity(Cliente cliente, ClienteRequestDTO dto) {
        if (dto.dni != null) cliente.setDni(dto.dni);
        if (dto.nombre != null) cliente.setNombre(dto.nombre);
        if (dto.email != null) cliente.setEmail(dto.email);
    }
}
