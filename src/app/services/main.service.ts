import { Injectable } from '@angular/core';
import { ProovedoresService } from './proovedores.service';
import { ErrorService } from './error.service';
import { ParametrizacionService } from './parametrizacion.service';
import { CategoriasService } from './categorias.service';
import { ClientesService } from './clientes.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    public ParametrizacionService: ParametrizacionService,
    public ProovedoresService: ProovedoresService,
    public CategoriasService: CategoriasService,
    public ErrorService: ErrorService,
    public ClientesService: ClientesService
  ) { }
}
