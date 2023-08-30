import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Material
import { MaterialModule } from './material/material.module';

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
    ModalProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
