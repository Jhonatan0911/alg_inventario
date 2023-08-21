import { Injectable } from '@angular/core';
import { ProovedoresService } from './proovedores.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    public ProovedoresService: ProovedoresService
  ) { }
}
