import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/categorias', pathMatch: 'full' },
  { 
    path: 'categorias',
    loadComponent: () => import('./components/categoria/categoria-list.component').then(m => m.CategoriaListComponent),
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'productos',
    loadComponent: () => import('./components/producto/producto-list.component').then(m => m.ProductoListComponent),
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'clientes',
    loadComponent: () => import('./components/cliente/cliente-list.component').then(m => m.ClienteListComponent),
    runGuardsAndResolvers: 'always'
  }
];
