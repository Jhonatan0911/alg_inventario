import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';

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
import { ModalNuevoRegistroCrmComponent } from './components/modal-nuevo-registro-crm/modal-nuevo-registro-crm.component';
import { ModalNotasComponent } from './components/modal-notas/modal-notas.component';
import { ModalModelosComponent } from './components/modal-productos/modal-modelos/modal-modelos.component';
import { NewModeloComponent } from './components/modal-productos/modal-modelos/new-modelo/new-modelo.component';
import { ModalSelectModeloComponent } from './components/modal-productos/modal-select-modelo/modal-select-modelo.component';


import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCo);


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
    ListadoGestionComponent,
    ModalNuevoRegistroCrmComponent,
    ModalNotasComponent,
    ModalModelosComponent,
    NewModeloComponent,
    ModalSelectModeloComponent
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
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
