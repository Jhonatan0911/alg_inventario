import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends BaseService {

  path: string = "Categoria/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  get(id: number): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerCategoria?IdCategoria="+id)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener categoria por id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAll(): Observable<any[]> {
    return this.http
    .get<any[]>(this._baseUrl + this.path + "ObtenerListadoCategorias?Estado=ACT")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar categorias');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(categoria: any): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "CrearCategoria?UsuarioId="+this.usuarioId, categoria)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear categoria con usuario id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  edit(categoria: any): Observable<any> {
    return this.http
    .put<Response<any>>(this._baseUrl +  this.path + "EditarCategoria?UsuarioId="+this.usuarioId, categoria)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Editar Categoria con usuarioId');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  delete(IdCategoria: number): Observable<any> {
    return this.http
    .delete<Response<any>>(this._baseUrl + this.path + "EliminarCategoria?IdCategoria="+IdCategoria+"&UsuarioId="+this.usuarioId)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('eliminar categoria');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
