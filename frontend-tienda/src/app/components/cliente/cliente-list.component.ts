import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Gestión de Clientes</h2>
      
      <div class="form-section">
        <h3>{{ editMode ? 'Editar' : 'Nuevo' }} Cliente</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>DNI:</label>
            <input type="text" class="form-control" [(ngModel)]="cliente.dni" name="dni" required>
          </div>
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" [(ngModel)]="cliente.nombre" name="nombre" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" [(ngModel)]="cliente.email" name="email">
          </div>
          <button type="submit" class="btn btn-primary">{{ editMode ? 'Actualizar' : 'Guardar' }}</button>
          <button type="button" class="btn" (click)="cancelEdit()" *ngIf="editMode">Cancelar</button>
        </form>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cli of clientes">
            <td>{{ cli.idCliente }}</td>
            <td>{{ cli.dni }}</td>
            <td>{{ cli.nombre }}</td>
            <td>{{ cli.email }}</td>
            <td>
              <button class="btn btn-primary" (click)="edit(cli)">Editar</button>
              <button class="btn btn-danger" (click)="delete(cli.idCliente!)">Eliminar</button>
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
export class ClienteListComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  cliente: Cliente = { dni: '', nombre: '', email: '' };
  editMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ClienteListComponent constructor llamado');
  }

  ngOnInit(): void {
    console.log('ClienteListComponent ngOnInit llamado');
    this.loadClientes();
  }

  ngOnDestroy(): void {
    console.log('ClienteListComponent ngOnDestroy llamado');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadClientes(): void {
    const sub = this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log('Clientes cargados:', data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar clientes', err)
    });
    this.subscriptions.push(sub);
  }

  onSubmit(): void {
    if (this.editMode) {
      const sub = this.clienteService.update(this.cliente.idCliente!, this.cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.resetForm();
          console.log('Cliente actualizado');
        },
        error: (err) => console.error('Error al actualizar', err)
      });
      this.subscriptions.push(sub);
    } else {
      const sub = this.clienteService.create(this.cliente).subscribe({
        next: () => {
          this.loadClientes();
          this.resetForm();
          console.log('Cliente creado');
        },
        error: (err) => console.error('Error al crear', err)
      });
      this.subscriptions.push(sub);
    }
  }

  edit(cli: Cliente): void {
    this.cliente = { ...cli };
    this.editMode = true;
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      const sub = this.clienteService.delete(id).subscribe({
        next: () => {
          this.loadClientes();
          console.log('Cliente eliminado');
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
    this.cliente = { dni: '', nombre: '', email: '' };
    this.editMode = false;
  }
}
