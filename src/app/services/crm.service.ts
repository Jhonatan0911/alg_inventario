import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { Response } from '../models/response/response';
import { RegistrosCRM, SeguimientoCRM } from '../models/crm/registros';
import { EstadosCRM } from '../models/parametrizacion/parametrizacion';

@Injectable({
  providedIn: 'root'
})
export class CrmService  extends BaseService {

  path: string = "Crm/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  getEstados(): Observable<Response<EstadosCRM[]>> {

    return this.http
    .get<Response<EstadosCRM[]>>(this._baseUrl + this.path + "ObtenerEstados")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('obtener seguimientos por registro id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAll(estado?:any, start?: Date, end?: Date, filtro?: string): Observable<Response<RegistrosCRM[]>> {

    const params = new HttpParams()
    .set("estado", estado != null ? estado  : "")
    .set("start", start != null ? start?.toDateString()  : "")
    .set("end", end != null ? end?.toDateString()  : "")
    .set("filtro", filtro != null ? filtro  : "")


    return this.http
    .get<Response<RegistrosCRM[]>>(this._baseUrl + this.path + "ObtenerListadoClientesCRM", {params :params})
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar regitros del crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(registro: RegistrosCRM, usuarioId: number): Observable<any> {

    return this.http
    .post<Response<boolean>>(this._baseUrl + this.path + "CrearClienteCRM?usuarioId="+usuarioId, registro)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear registro crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  createNotaRegistro(seguimiento: SeguimientoCRM, usuarioId: number): Observable<any> {
    return this.http
    .post<Response<boolean>>(this._baseUrl + this.path + "CrearSeguimientoCRM?usuarioId="+ usuarioId, seguimiento)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear seguimiento a un registro crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getSeguimientos(registro: number): Observable<Response<SeguimientoCRM[]>> {

    return this.http
    .get<Response<SeguimientoCRM[]>>(this._baseUrl + this.path + "ObtenerSeguimientoCRMClienteId?clienteId="+registro)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('obtener seguimientos por registro id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }


}
