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

  path: string = "Proveedor/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  get(id: number): Observable<any> {
    return this.http
    .get<Response<any>>(this._baseUrl + this.path + "ObtenerProvedor?IdProveedor="+id)
    .pipe(
      map((response) => response.data),
      tap((a) => {
        this.logs('obtener proveedor por id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAll(estado?:any, filtro?: any): Observable<any[]> {
    let filtroEstado = estado ? estado : "ACT";
    let filtroKey = filtro ? filtro : "";

    return this.http
    .get<any[]>(this._baseUrl + this.path + "ObtenerListadoProvedores?Estado="+filtroEstado+"&Filtro="+filtroKey)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar proveedores');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(proveedor: any): Observable<any> {
    return this.http
    .post<Response<any>>(this._baseUrl + this.path + "CrearProveedor?UsuarioId="+this.usuarioId, proveedor)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear proveedor con usuario id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  edit(proveedor: any): Observable<any> {
    return this.http
    .put<Response<any>>(this._baseUrl +  this.path + "EditarProveedor?UsuarioId="+this.usuarioId, proveedor)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Editar Proveedor con usuarioId');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  delete(IdProveedor: number): Observable<any> {
    return this.http
    .delete<Response<any>>(this._baseUrl + this.path + "EliminarProveedor?IdProveedor="+IdProveedor+"&UsuarioId="+this.usuarioId)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('eliminar proveedor');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }
}
