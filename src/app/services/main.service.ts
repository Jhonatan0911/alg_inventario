import { Injectable } from '@angular/core';
import { ProovedoresService } from './proovedores.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    public ProovedoresService: ProovedoresService,
    public ErrorService: ErrorService
  ) { }
}
