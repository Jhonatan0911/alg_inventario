import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class ProovedoresService  extends BaseService {

  path: string = "ProductoFormula/";
  usuarioId = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  get(id: number): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerFormulaById?FormulaId="+id)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener formula por id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAllbyProducto(productoid: number): Observable<any[]> {
    return this.http
    .get<any[]>(this._baseUrl + this.path + "ListadoFormulaByProductoId?ProductoId="+productoid+"?Estado=ACT")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar formulas por producto');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(formula: any, producto: any): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "CrearCategoria?UsuarioId="+this.usuarioId + "&ProductoId="+ producto, formula)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear formula con usuario id a un producto');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  edit(formula: any, producto: any): Observable<any> {
    return this.http
    .put<Response<any>>(this._baseUrl +  this.path + "EditarCategoria?UsuarioId="+this.usuarioId+"&ProductoId="+producto, formula)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Editar formula con usuarioId');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  delete(formulaId: number): Observable<any> {
    return this.http
    .delete<Response<any>>(this._baseUrl + this.path + "EliminarCategoria?FormulaId="+formulaId+"&UsuarioId="+this.usuarioId)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('eliminar formula');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
