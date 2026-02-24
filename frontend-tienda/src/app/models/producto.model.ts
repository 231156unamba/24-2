export interface Producto {
  idProducto?: number;
  nombre: string;
  precio: number;
  stock: number;
  idCategoria: number;
  categoriaNombre?: string;
}
