import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Gestión de Categorías</h2>
      
      <div class="form-section">
        <h3>{{ editMode ? 'Editar' : 'Nueva' }} Categoría</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" [(ngModel)]="categoria.nombre" name="nombre" required>
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <input type="text" class="form-control" [(ngModel)]="categoria.descripcion" name="descripcion">
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
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cat of categorias">
            <td>{{ cat.idCategoria }}</td>
            <td>{{ cat.nombre }}</td>
            <td>{{ cat.descripcion }}</td>
            <td>
              <button class="btn btn-primary" (click)="edit(cat)">Editar</button>
              <button class="btn btn-danger" (click)="delete(cat.idCategoria!)">Eliminar</button>
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
export class CategoriaListComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  categoria: Categoria = { nombre: '', descripcion: '' };
  editMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('CategoriaListComponent constructor llamado');
  }

  ngOnInit(): void {
    console.log('CategoriaListComponent ngOnInit llamado');
    this.loadCategorias();
  }

  ngOnDestroy(): void {
    console.log('CategoriaListComponent ngOnDestroy llamado');
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  onSubmit(): void {
    if (this.editMode) {
      const sub = this.categoriaService.update(this.categoria.idCategoria!, this.categoria).subscribe({
        next: () => {
          this.loadCategorias();
          this.resetForm();
          console.log('Categoría actualizada');
        },
        error: (err) => console.error('Error al actualizar', err)
      });
      this.subscriptions.push(sub);
    } else {
      const sub = this.categoriaService.create(this.categoria).subscribe({
        next: () => {
          this.loadCategorias();
          this.resetForm();
          console.log('Categoría creada');
        },
        error: (err) => console.error('Error al crear', err)
      });
      this.subscriptions.push(sub);
    }
  }

  edit(cat: Categoria): void {
    this.categoria = { ...cat };
    this.editMode = true;
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      const sub = this.categoriaService.delete(id).subscribe({
        next: () => {
          this.loadCategorias();
          console.log('Categoría eliminada');
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
    this.categoria = { nombre: '', descripcion: '' };
    this.editMode = false;
  }
}
