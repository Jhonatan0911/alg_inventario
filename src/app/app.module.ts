import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

// Paginas
import { LoginComponent } from './pages/login/login.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ModalProveedoresComponent } from './components/modal-proveedores/modal-proveedores.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ModalCategoriasComponent } from './components/modal-categorias/modal-categorias.component';
import { ModalClientesComponent } from './components/modal-clientes/modal-clientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';
import { ProductCardComponent } from './pages/productos/product-card/product-card.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ModalMiniFormulaComponent } from './components/modal-mini-formula/modal-mini-formula.component';
import { ModalEspecificacionesComponent } from './components/modal-productos/modal-especificaciones/modal-especificaciones.component';
import { ListadoGestionComponent } from './pages/listado-gestion/listado-gestion.component';
import { PrimengModule } from './prime/primeng.module';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    DashboardLayoutComponent,
    LoginComponent,
    ProveedoresComponent,
    ModalProveedoresComponent,
    CategoriasComponent,
    ModalCategoriasComponent,
    ModalClientesComponent,
    ClientesComponent,
    ProductosComponent,
    ModalProductosComponent,
    ProductCardComponent,
    ServiciosComponent,
    FacturasComponent,
    HistorialComponent,
    ModalMiniFormulaComponent,
    ModalEspecificacionesComponent,
    ListadoGestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
