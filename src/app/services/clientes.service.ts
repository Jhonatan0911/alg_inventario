import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Response } from '../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseService {

  path: string = "Cliente/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  get(id: any): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerCliente?IdCliente="+id)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener cliente por id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAll(estado?:any, filtro?: any): Observable<any[]> {

    let filtroEstado = estado ? estado : "ACT";
    let filtroKey = filtro ? filtro : "";

    return this.http
    .get<any[]>(this._baseUrl + this.path + "ObtenerListadoClientes?Estado="+filtroEstado+"&Filtro="+filtroKey)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar clientes');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(cliente: any): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "CrearCliente?UsuarioId="+this.usuarioId, cliente)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear cliente con usuario id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  edit(cliente: any): Observable<any> {
    return this.http
    .put<Response<any>>(this._baseUrl +  this.path + "EditarCliente?UsuarioId="+this.usuarioId, cliente)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Editar cliente con usuarioId');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  delete(IdCliente: number): Observable<any> {
    return this.http
    .delete<Response<any>>(this._baseUrl + this.path + "EliminarCliente?IdCliente="+IdCliente+"&UsuarioId="+this.usuarioId)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('eliminar cliente');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
