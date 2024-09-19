import { Injectable } from '@angular/core';
import { ProovedoresService } from './proovedores.service';
import { ErrorService } from './error.service';
import { ParametrizacionService } from './parametrizacion.service';
import { CategoriasService } from './categorias.service';
import { ClientesService } from './clientes.service';
import { ProductosService } from './productos.service';
import { FacturaService } from './factura.service';
import { CrmService } from './crm.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    public ParametrizacionService: ParametrizacionService,
    public ProovedoresService: ProovedoresService,
    public ProductosService: ProductosService,
    public CategoriasService: CategoriasService,
    public ErrorService: ErrorService,
    public ClientesService: ClientesService,
    public FacturaService: FacturaService,
    public CrmService: CrmService,
  ) { }
}
