package com.tienda.api_tienda.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(nullable = false, unique = true, length = 15)
    private String dni;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 100)
    private String email;

    public Integer getIdCliente() { return idCliente; }
    public void setIdCliente(Integer idCliente) { this.idCliente = idCliente; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
