import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

const routes: Routes = [
  {
    path: "", component: MainLayoutComponent, children: [
      { path: "", component: LoginComponent },
    ]
  },
  {
    path: "", component: DashboardLayoutComponent, children: [
      { path: "proovedores", component: ProveedoresComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
