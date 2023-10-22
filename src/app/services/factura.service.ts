import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';
import { factura } from '../models/factura/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService  extends BaseService {

  path: string = "Facturacion/";
  usuarioId = 1;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  GenerarFactura(datos: factura): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "GenerarFactura", datos)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Generar facturas');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
