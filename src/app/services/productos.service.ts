import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService {

  path: string = "Producto/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  get(id: number): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerProducto?IdProducto="+id)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener producto por id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getByCategoria(catgeoria: any): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerProductoByCategoriaId?CategoriaId="+catgeoria)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener producto por catgeoria');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }


  getAll(estado?:any, filtro?: any): Observable<any[]> {
    let filtroEstado = estado ? estado : "ACT";
    let filtroKey = filtro ? filtro : "";

    return this.http
    .get<any[]>(this._baseUrl + this.path + "ObtenerListadoProductos?Estado="+filtroEstado+"&Filtro="+filtroKey)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar productos');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(producto: any): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "CrearProducto?UsuarioId="+1, producto)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear producto con usuario id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  edit(producto: any): Observable<any> {
    return this.http
    .put<Response<any>>(this._baseUrl +  this.path + "EditarProducto?UsuarioId="+this.usuarioId, producto)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Editar producto con usuarioId');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  delete(IdProducto: number): Observable<any> {
    return this.http
    .delete<Response<any>>(this._baseUrl + this.path + "EliminarProducto?IdProducto="+IdProducto+"&UsuarioId="+this.usuarioId)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('eliminar producto');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
