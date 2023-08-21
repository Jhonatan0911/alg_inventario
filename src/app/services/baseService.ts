import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

let URL = environment.apiUrl;
export class BaseService {
  public _baseUrl: string;

  constructor() {
    this._baseUrl = URL + "/api/";
  }

  logs(data: any) {
    if (!environment.production) {
      console.dir(data);
    }

  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else if (error.statusText == 'Forbidden' || error.status == 403) {
      errorMessage = 'Su sesión a finalizado, ingrese nuevamente';
    } else if (error.status == 401) {
      errorMessage = 'No autorizado para esta función';
    } else if (error.status == 404) {
      errorMessage = 'No se ha encontrado';
    }else if (error.status == 0) {
      errorMessage = 'No se puede conectar al servicio';
    }else if (error.status == 500) {
      errorMessage = 'Ha ocurrido un error verifique e intente de nuevo. si el error consiste comuniquese con sistemas';
    } else if (error.error) {
      // Get server-side error
      errorMessage = `${error.error}`;
    } else {
      // Get server-side error
      errorMessage = `${error}`;
    }
    return throwError(errorMessage);
  }
}
