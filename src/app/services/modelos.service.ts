import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';
import { ObtenerListadoProductosResult } from '../models/productos/producto';
import { InsertarModelosRequest, ObtenerListadoModelosbyProductoResult } from '../models/modelo/modelos';

@Injectable({
  providedIn: 'root'
})
export class ModelosService extends BaseService {

  path: string = "ModelosProducto/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  getModelosByProducto(id: number): Observable<Response<ObtenerListadoModelosbyProductoResult>> {
    return this.http
    .get<Response<ObtenerListadoModelosbyProductoResult>>(this._baseUrl + this.path + "ObtenerListadoModelosbyProducto?ProductoId="+id)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('obtener modelos por producto');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  insertarModelos(modelo: InsertarModelosRequest): Observable<Response<boolean>> {
    return this.http
    .post<Response<boolean>>(this._baseUrl + this.path + "InsertarModelos", modelo)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Insertar modelo en un producto');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
