import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService';
import { Departamento, Estados, TipoDocumento, municipio } from '../models/parametrizacion/parametrizacion';
import { Response } from '../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class ParametrizacionService extends BaseService {

  path: string = "Parametrizacion/";

  constructor(
    private http: HttpClient
  ){
    super();
  }

  estados(): Observable<any> {
    return this.http
    .get<Response<Estados[]>>(this._baseUrl + this.path + "ObtenerEstados")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo estados');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  tipoDocumentos(): Observable<any> {
    return this.http
    .get<Response<TipoDocumento[]>>(this._baseUrl + this.path + "ObtenerTipoDocumento")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo tipo documento');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  departamento(): Observable<any> {
    return this.http
    .get<Response<Departamento[]>>(this._baseUrl + this.path + "ObtenerDepartamentos")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo departamentos');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  municipioByDepartamento(departamento: any): Observable<any> {
    return this.http
    .get<Response<municipio[]>>(this._baseUrl + this.path + "ObtenerMunicipios?CodDepartamento="+departamento)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo municipio por departamento');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  parametrizacionProductos(): Observable<any> {
    return this.http
    .get<Response<any[]>>(this._baseUrl + "ParProducto/" + "ObtenerListadoParParoductos?Estado=ACT")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo parametrizacines de los prodcutos');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  obtenerParametrosByProducto(producto:any): Observable<any> {
    return this.http
    .get<Response<any[]>>(this._baseUrl + "ParProducto/" + "ObtenerParProducto?IdParProducto="+producto)
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('Combo parametros de un prodcutos');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }

  formulasExcel(): Observable<any> {
    return this.http
    .get<Response<Departamento[]>>(this._baseUrl + this.path + "ObtenerFormulasExcel")
    .pipe(
      map((response) => response),
      tap((a) => {
        this.logs('formulas rapidas de excel');
        this.logs(a);
      }),
      catchError(this.errorMgmt)
    );
  }


}
