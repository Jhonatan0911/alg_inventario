import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { Response } from '../models/response/response';
import { RegistrosCRM, SeguimientoCRM } from '../models/crm/registros';

@Injectable({
  providedIn: 'root'
})
export class CrmService  extends BaseService {

  path: string = "CRM/";
  usuarioId: number = 23;

  constructor(
    private http: HttpClient
  ){
    super();
  }

  getSeguimientos(registro: number): Observable<Response<SeguimientoCRM[]>> {

    return this.http
    .get<Response<SeguimientoCRM[]>>(this._baseUrl + this.path + "ObtenerCliente?IdCliente="+registro)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('obtener seguimientos por registro id');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  getAll(estado?:any, start?: Date, end?: Date): Observable<Response<RegistrosCRM[]>> {

    const params = new HttpParams()
    .set("Estado", estado != null ? estado  : "")
    .set("Start", start != null ? start?.toDateString()  : "")
    .set("End", end != null ? end?.toDateString()  : "")


    return this.http
    .get<Response<RegistrosCRM[]>>(this._baseUrl + this.path + "ObtenerRegistros", {params :params})
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Buscar regitros del crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  create(registro: RegistrosCRM): Observable<any> {
    return this.http
    .post<Response<boolean>>(this._baseUrl + this.path + "CrearRegistro", registro)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear registro crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  createNotaRegistro(seguimiento: SeguimientoCRM): Observable<any> {
    return this.http
    .post<Response<boolean>>(this._baseUrl + this.path + "crearSeguimientoRegistro", seguimiento)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Crear seguimiento a un registro crm');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

}
