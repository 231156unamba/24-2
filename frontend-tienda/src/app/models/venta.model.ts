export interface Venta {
  idVenta?: number;
  fecha: Date;
  total: number;
  idCliente: number;
  idUsuario: number;
  clienteNombre?: string;
}

export interface DetalleVenta {
  idDetalle?: number;
  idVenta: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  productoNombre?: string;
}
