import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Gestión de Productos</h2>
      
      <div class="form-section">
        <h3>{{ editMode ? 'Editar' : 'Nuevo' }} Producto</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" [(ngModel)]="producto.nombre" name="nombre" required>
          </div>
          <div class="form-group">
            <label>Precio:</label>
            <input type="number" step="0.01" class="form-control" [(ngModel)]="producto.precio" name="precio" required>
          </div>
          <div class="form-group">
            <label>Stock:</label>
            <input type="number" class="form-control" [(ngModel)]="producto.stock" name="stock" required>
          </div>
          <div class="form-group">
            <label>Categoría:</label>
            <select class="form-control" [(ngModel)]="producto.idCategoria" name="idCategoria" required>
              <option value="">Seleccione una categoría</option>
              <option *ngFor="let cat of categorias" [value]="cat.idCategoria">{{ cat.nombre }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">{{ editMode ? 'Actualizar' : 'Guardar' }}</button>
          <button type="button" class="btn" (click)="cancelEdit()" *ngIf="editMode">Cancelar</button>
        </form>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let prod of productos">
            <td>{{ prod.idProducto }}</td>
            <td>{{ prod.nombre }}</td>
            <td>S/ {{ prod.precio }}</td>
            <td>{{ prod.stock }}</td>
            <td>{{ getCategoriaName(prod.idCategoria) }}</td>
            <td>
              <button class="btn btn-primary" (click)="edit(prod)">Editar</button>
              <button class="btn btn-danger" (click)="delete(prod.idProducto!)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-section {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    button {
      margin-right: 0.5rem;
    }
  `]
})
export class ProductoListComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  producto: Producto = { nombre: '', precio: 0, stock: 0, idCategoria: 0 };
  editMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ProductoListComponent constructor llamado');
  }

  ngOnInit(): void {
    console.log('ProductoListComponent ngOnInit llamado');
    this.loadProductos();
    this.loadCategorias();
  }

  ngOnDestroy(): void {
    console.log('ProductoListComponent ngOnDestroy llamado');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadProductos(): void {
    const sub = this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
    this.subscriptions.push(sub);
  }

  loadCategorias(): void {
    const sub = this.categoriaService.getAll().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('Categorías cargadas:', data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar categorías', err)
    });
    this.subscriptions.push(sub);
  }

  getCategoriaName(id: number): string {
    const cat = this.categorias.find(c => c.idCategoria === id);
    return cat ? cat.nombre : '';
  }

  onSubmit(): void {
    if (this.editMode) {
      const sub = this.productoService.update(this.producto.idProducto!, this.producto).subscribe({
        next: () => {
          this.loadProductos();
          this.resetForm();
          console.log('Producto actualizado');
        },
        error: (err) => console.error('Error al actualizar', err)
      });
      this.subscriptions.push(sub);
    } else {
      const sub = this.productoService.create(this.producto).subscribe({
        next: () => {
          this.loadProductos();
          this.resetForm();
          console.log('Producto creado');
        },
        error: (err) => console.error('Error al crear', err)
      });
      this.subscriptions.push(sub);
    }
  }

  edit(prod: Producto): void {
    this.producto = { ...prod };
    this.editMode = true;
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      const sub = this.productoService.delete(id).subscribe({
        next: () => {
          this.loadProductos();
          console.log('Producto eliminado');
        },
        error: (err) => console.error('Error al eliminar', err)
      });
      this.subscriptions.push(sub);
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.producto = { nombre: '', precio: 0, stock: 0, idCategoria: 0 };
    this.editMode = false;
  }
}
