import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { HistorialComponent } from './pages/historial/historial.component';

const routes: Routes = [
  {
    path: "", component: MainLayoutComponent, children: [
      { path: "", component: LoginComponent },
    ]
  },
  {
    path: "", component: DashboardLayoutComponent, children: [
      { path: "proveedores", component: ProveedoresComponent },
      { path: "categorias", component: CategoriasComponent },
      { path: "clientes", component: ClientesComponent },
      { path: "productos", component: ProductosComponent },
      { path: "factura", component: FacturasComponent },
      { path: "historial", component: HistorialComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
