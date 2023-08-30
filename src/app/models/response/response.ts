export interface Response<T> {
  isSuccess: boolean;
  statusCode: number;
  mensaje: string;
  exMensaje: string;
  data: T;
  erros: any | undefined;
}
